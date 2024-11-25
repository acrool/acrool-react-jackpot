import type {Meta, StoryObj} from '@storybook/react';

import {useArgs} from '@storybook/preview-api';
import {Jackpot} from '@acrool/react-jackpot';
import WithReactSpring from '../../atoms/WithReactSpring/WithReactSpring';
import {useEffect} from 'react';
import {Flex} from '@acrool/react-grid';
import {getRandom} from '../../../utils';


const meta = {
    title: 'Atoms/With React Spring',
    component: Jackpot,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Jackpot animation use transform'
            },
        },
    },
    // tags: ['autodocs'],
    argTypes: {},
    args: {
        amount: 32767,
        length: 10
    },
    render: function Render(args) {

        const [{amount}, updateArgs] = useArgs<{ amount: number }>();

        // 因為無法像 useState 取得
        const onChange = (newValue: number) => updateArgs({amount: args.amount + newValue});


        useEffect(() => {
            const timeRef = setInterval(() => {
                onChange(getRandom(1000));
            }, 3000);

            return () => {
                clearInterval(timeRef);
            };

        }, [amount]);

        return <Flex column style={{fontSize: '26px'}}>
            <div style={{position: 'fixed', top: '10px', left: '10px'}}>Amount: {args.amount}</div>
            <WithReactSpring {...args}/>
        </Flex>;
    }
} satisfies Meta<typeof Jackpot>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {},
};
