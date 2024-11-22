import {useState, useEffect} from 'react';
import {clsx} from 'clsx';
import CSS from 'csstype';
import styles from './jackpot.module.scss';
import Numbers from './_components/Numbers';
import {formatCurrency} from './utils';

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

        // 比較兩個陣列的數字，取得比較大的 index
        // ex: [1, 2, 3, 4, 5] & [1, 2, 3, 5, 4] => [4]
        const compareNumber = digits
            .map((value, index) => [parseFloat(value), parseFloat(targetDigits[index]), index]) // 轉換為數字比較
            .filter(([valueA, valueB]) => !isNaN(valueA) && !isNaN(valueB) && valueB > valueA) // 過濾條件
            .map(([, , index]) => index);

        return digits.map((digit, index) => {
            if (digit !== ',') {
                const currentAmount = index > compareNumber[0] ? Number(digits[index]) + 10 : Number(digits[index]);

                return <Numbers key={index} amount={currentAmount} renderNumber={renderNumber} duration={0.6 + (digits.length - index) * 0.2}/>;
            }
            if (renderNumber) {
                return <div key={index}>{renderNumber(',')}</div>;
            }

            return <div key={index}>,</div>;
        });
    };


    return (
        <div className={clsx(className, styles.root)} style={style}>
            {renderMotionNumber()}
        </div>
    );
};

export default Jackpot;
