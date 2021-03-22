# use-keys

React hook to enable hot keys in the app. A hot key is a keyboard key pressed when the focus is on the page body (i.e. not in an input field). You may optionally enable the hotkey to also work inside a form input field. When a user presses the hot key, the hook provides an updated state for keyState. You may set multiple hot keys while initiating the hook.

[![NPM](https://img.shields.io/npm/v/use-keys.svg)](https://www.npmjs.com/package/use-keys) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-keys
```

## Usage

```tsx
import * as React from 'react'

import { useKeys } from 'use-keys'

const Example = () => {
    const { keyState } = useKeys([
        // adds hot key for '/' when focus is on body, ignores typing in an input field
        {
            id: 'slash', // id can be anything
            key: '/', // key should match event.key
            // callback to be called only when this hot key '/' is pressed
            onKey: () => {
                console.log('onKey() called for / ')
            },
        },
        // adds hot key for '.' that also works in input fields
        {
            id: 'period',
            key: '.',
            includeFormElements: true,
        },
        // adds hot key for 'Ctrl+x' when focus is on body, ignores typing in an input field
        {
            id: 'ctrlX',
            key: 'x',
            ctrlKey: true,
        },
        // adds hot key for 'Ctrl+Shift+1' that also works in input fields
        {
            id: 'ctrlShift1',
            key: '1',
            includeFormElements: true,
            ctrlKey: true,
            shiftKey: true,
        },
    ])

    // keyState will be null until user presses a matching keyState
    // in which case keyState.key will return the key string e.g. '/'
    return <div>{keyState && keyState.key}</div>
}
```

## License

MIT © [samirdamle](https://github.com/samirdamle)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
