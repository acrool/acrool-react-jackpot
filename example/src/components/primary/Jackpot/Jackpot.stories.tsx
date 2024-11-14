import type {Meta, StoryObj} from '@storybook/react';

import {useArgs} from '@storybook/preview-api';
import {Jackpot} from '@acrool/react-jackpot';
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
        const onChange = (newValue: number) => updateArgs({amount: args.amount + newValue});


        useEffect(() => {
            const timeRef = setInterval(() => {
                onChange(getRandom(1000));
            }, 3000);

            return () => {
                clearInterval(timeRef);
            };

        }, []);

        return <Flex column style={{fontSize: '26px'}}>
            curr: {args.amount}
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
        amount: 1234567890,
        renderNumber: (currentNumber: number) => <Text>{currentNumber}</Text>,
    },
};

