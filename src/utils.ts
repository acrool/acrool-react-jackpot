import {TSizeValue} from './types';


export const getSizeValue = (value: TSizeValue) => {
    if(value === true){
        return '100%';
    }
    if(value === false){
        return 'auto';
    }
    if(typeof value === 'number'){
        return `${value}px`;
    }
    return String(value);
};



export const getRadiusValue = (value: TSizeValue) => {
    if(value === true){
        return;
    }
    if(value === false){
        return 'auto';
    }
    if(typeof value === 'number'){
        return `${value}px`;
    }
    return String(value);
};


/**
 * 千分位格式化
 * @param val 原數值
 */
export const formatCurrency = (val: number|string): string => {
    const parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};
