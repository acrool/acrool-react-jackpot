import {motion, useAnimationControls} from 'framer-motion';
import {useState, useEffect, useCallback} from 'react';
import styles from '../jackpot.module.scss';

interface IProps {
    amount?: number;
    renderNumber?: (currentNumber: number) => React.ReactNode;
    duration?: number;
}

const numberTotal = 20;
const pi = 100 / numberTotal;


/**
 * 數字 0~9 循環兩次
 * @param amount
 * @param renderNumber
 * @param duration
 * @constructor
 */
const Numbers = ({
    amount = 0,
    renderNumber,
    duration = 0.6,
}: IProps) => {
    const [digits, setDigits] = useState<number>(0);
    const animationControls = useAnimationControls();

    useEffect(() => {
        setDigits(amount);

        const target = amount;
        const isRollBack = target < digits;
        const toValue = isRollBack ? target + 10 : target;

        animationControls.start({
            y: `-${toValue * pi}%`,
        });
    }, [amount]);



    const renderMotion = useCallback(() => {
        const target = amount;
        const isRollBack = target < digits;
        const toValue = isRollBack ? target + 10 : target;

        return (
            <motion.div
                className={styles.motion}
                initial={{y: `-${digits * pi}%`}}
                animate={animationControls}
                transition={{
                    duration,
                    ease: 'easeInOut',
                }}
                onAnimationComplete={() => {
                    if (isRollBack) {
                        animationControls.set({y: `-${(toValue - 10) * pi}%`});
                    }
                }}
            >
                {[...Array(numberTotal)].map((row, i) => {
                    const num = i % 10;
                    return (
                        <div
                            key={i}
                            className={styles.num}
                            data-active={digits === num ? 'true' : undefined}
                        >
                            {renderNumber ? renderNumber(num) : num}
                        </div>
                    );
                })}
            </motion.div>
        );
    }, [amount]);


    return renderMotion();
};

export default Numbers;
