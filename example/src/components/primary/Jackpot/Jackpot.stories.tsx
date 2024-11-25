import type {Meta, StoryObj} from '@storybook/react';

import {useArgs} from '@storybook/preview-api';
import {Jackpot, JackpotSpring} from '@acrool/react-jackpot';
import {useEffect} from 'react';
import {Flex} from '@acrool/react-grid';
import {getRandom} from './utils';
import Text from './Text';


const meta = {
    title: 'Primary/Jackpot',
    component: Jackpot,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Jackpot animation use transform'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        amount: 32767,
        length: 10
    },
    render: function Render(args) {

        const [{amount}, updateArgs] = useArgs<{amount: number}>();

        // 因為無法像 useState 取得
        const onChange = (newValue: number) => updateArgs({amount: args.amount + 1234});


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
            <Jackpot {...args}/>
        </Flex>;

    }
} satisfies Meta<typeof Jackpot>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {},
};
export const RenderNumber: Story = {
    args: {
        renderNumber: (currentNumber: number|string) => <Text>{currentNumber}</Text>,
    },
};
export const WithReactSpring: Story = {
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
            <JackpotSpring {...args}/>
        </Flex>;
    }
};
