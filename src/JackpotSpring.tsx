import CSS from 'csstype';
import styles from './jackpot.module.scss';
import {ReactNode, useEffect, useState} from 'react';
import {animated, config, useSprings} from '@react-spring/web';
import {clsx} from 'clsx';



interface IProps {
    className?: string
    style?: CSS.Properties
    amount?: number;
    length?: number;
    renderNumber?: (currentNumber: number) => ReactNode
}


const numberTotal = 20;
const pi = 100 / numberTotal;

const JackpotSpring = ({
    amount = 0,
    length = 5,
    renderNumber,
}: IProps) => {
    const defaultValue = Array(length).fill('0');

    const targetDigits = amount.toString().padStart(length, '0').split('');
    const [digits, setDigits] = useState<number[]>(amount === 0 ? targetDigits: defaultValue);

    const [springs, api] = useSprings(
        digits.length,
        (index) => {
            const target = Number(targetDigits[index]);
            const isRollBack = target < digits[index];
            const toValue = isRollBack ? target + 10 : target;

            return {
                from: {transform: `translateY(-${digits[index] * pi}%)`},
                to: {transform: `translateY(-${toValue * pi}%)`},
                config: {...config.molasses, duration: 600 * (digits.length - index)},
                reset: false,
                onRest: () => {
                    if(isRollBack){
                        api.set((setIndex) => {
                            if(index === setIndex){
                                return {
                                    transform: `translateY(-${(toValue - 10) * pi}%)`
                                };
                            }
                            return {};
                        });
                    }
                }
            };
        },
        [amount],
    );

    useEffect(() => {
        setDigits(targetDigits.map(Number));
    }, [amount]);

    return (
        <div className={styles.root}>
            {springs.map((props, index) => (
                <animated.div
                    key={index}
                    style={props}
                    className={styles.motion}
                >
                    {[...Array(numberTotal)].map((_, i) => {
                        const num = i >= 10 ? i - 10: i;
                        const isActive = digits[index] === i ? 'active' : '';
                        return (
                            <div
                                key={i}
                                className={clsx(styles.num)}
                                data-active={isActive ? '': undefined}
                            >
                                {renderNumber ? renderNumber(num) : num}
                            </div>
                        );
                    })}
                </animated.div>
            ))}
        </div>
    );
};

export default JackpotSpring;
