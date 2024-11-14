import {ReactNode} from 'react';
import styled from 'styled-components';
import CSS from 'csstype';

interface IProps  {
    className?: string
    style?: CSS.Properties
    children?: ReactNode
}


/**
 * 有 Border 的文字，限制只能是字串或數字
 * @param className
 * @param style
 * @param children
 */
const Text = ({
    className,
    style,
    children,
}: IProps) => {
    return <TextRoot
        className={className}
        style={style}
        data-storke={children}
    >
        {children}
    </TextRoot>;
};

export default Text;





const TextRoot = styled.span`
    color: #fff;
    position: relative;
    z-index: 1;
    font-size: inherit;
    line-height: inherit;
    white-space: nowrap;
    font-weight: bold;

    :before {
        font-size: inherit;
        line-height: inherit;
        position: absolute;
        z-index: -1;
        -webkit-text-stroke: 3px #000;
        content: attr(data-storke);
    }
`;
