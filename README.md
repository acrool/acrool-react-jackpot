# Acrool React Jackpot

<a href="https://acrool-react-jackpot.pages.dev/" title="Acrool React Jackpot - Fast custom jackpot for Reactjs">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-jackpot/main/example/public/og.webp" alt="Acrool React Jackpot Logo"/>
</a>

<p align="center">
    Fast custom jackpot for Reactjs
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-jackpot.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-jackpot)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-jackpot?style=for-the-badge)](https://github.com/acrool/@acrool/react-jackpot/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-jackpot?style=for-the-badge)](https://github.com/acrool/react-jackpot/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-jackpot.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-jackpot)
[![npm](https://img.shields.io/npm/dt/@acrool/react-jackpot.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-jackpot)

</div>

## Features

- Support custom length

## Install

```bash
yarn add @acrool/react-jackpot
```

## Usage

add in your index.tsx
```tst
import "@acrool/react-jackpot/dist/index.css";
```

then in your page

```tsx
import {Flex, fr, Grid} from '@acrool/react-grid';
import styled from 'styled-components';

import {Jackpot} from '@acrool/react-jackpot';
import {generatorArray} from '@acrool/js-utils/array';
import {useRef} from "react";

const Example = () => {
    const [amount, setAmount] = useState(32767);
    const timeRef = useRef<Node.Timer>(null);

    useEffect(() => {
        timeRef = setInterval(() => {
            onChange(getRandom(1000));
        }, 3000);

        return () => {
            clearInterval(timeRef.current);
        };

    }, []);

    return (
        <Jackpot length={7} amount={amount}/>
    );

export default Example;

```


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-jackpot/main/play-in-example-button.svg)](https://acrool-react-jackpot.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
