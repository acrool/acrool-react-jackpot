import {useState, useEffect} from 'react';
import {clsx} from 'clsx';
import CSS from 'csstype';
import styles from './jackpot.module.scss';
import Numbers from './_components/Numbers';
import {formatCurrency, getCompareNumber} from './utils';

interface IProps {
    className?: string;
    style?: CSS.Properties;
    amount?: number;
    length?: number;
    renderNumber?: (currentNumber: number|string) => React.ReactNode;
}




/**
 * Jackpot
 * @param className
 * @param style
 * @param amount
 * @param length
 * @param renderNumber
 * @constructor
 */
const Jackpot = ({
    className,
    style,
    amount = 0,
    length = 5,
    renderNumber,
}: IProps) => {
    const targetDigits = formatCurrency(amount.toString().padStart(length, '0')).split('');
    const [digits, setDigits] = useState<string[]>(targetDigits);

    useEffect(() => {
        setDigits(targetDigits);
    }, [amount]);


    /**
     * 渲染數字（0~9循環兩次）
     */
    const renderMotionNumber = () => {
        const compareNumber = getCompareNumber(digits, targetDigits);

        return digits.map((digit, index) => {
            if (digit === ',') {
                if (renderNumber) {
                    return <div key={index}>{renderNumber(',')}</div>;
                }
                return <div key={index}>,</div>;
            }

            const currentAmount = index > compareNumber[0] ? Number(digits[index]) + 10 : Number(digits[index]);
            return <Numbers key={index} amount={currentAmount} renderNumber={renderNumber} duration={0.6 + (digits.length - index) * 0.2}/>;
        });
    };


    return (
        <div className={clsx(className, styles.root)} style={style}>
            {renderMotionNumber()}
        </div>
    );
};

export default Jackpot;
