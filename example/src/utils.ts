
/**
 * 取得前端資源網址
 */
export function asset(path?: string): string{
    if(path){
        // 去除參數第一個斜線
        return `/${path.replace(/^\//, '')}`;
    }
    return '';
}


/**
 * 取亂數
 * @param x
 */
export const getRandom = (x: number): number => {
    return Math.floor(Math.random()*x)+1;
};
