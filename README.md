# use-hot-keys

> Reat hook to enable hot keys in the app. A hot key is a keyboard key pressed when the focus is on the page body, not in a form input field. When a user presses the hot key, the hook provides an updated state for hotKey. You can set multiple hot keys while initiating the hook.

[![NPM](https://img.shields.io/npm/v/use-hot-keys.svg)](https://www.npmjs.com/package/use-hot-keys) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-hot-keys
```

## Usage

```tsx
import * as React from 'react'

import useHotKeys from 'use-hot-keys'

const Example = () => {
    const { hotKey } = useHotKeys()
    return <div>{hotKey.key}</div>
}
```

## License

MIT © [samirdamle](https://github.com/samirdamle)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
