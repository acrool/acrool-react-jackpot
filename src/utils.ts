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


/**
 * 比較兩個陣列的數字，取得比較大的 index
 * ex: [1, 2, 3, 4, 5] & [1, 2, 3, 5, 4] => [4]
 * @param originArray
 * @param targetArray
 */
export const getCompareNumber = (originArray: string[], targetArray: string[]) => {
    return originArray
        .map((value, index) => [parseFloat(value), parseFloat(targetArray[index]), index]) // 轉換為數字比較
        .filter(([valueA, valueB]) => !isNaN(valueA) && !isNaN(valueB) && valueB > valueA) // 過濾條件
        .map(([, , index]) => index);
};
