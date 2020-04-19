import React from 'react'

import { useKeys } from 'use-keys'

const App = () => {
    const { hotKey } = useKeys([
        {
            id: 0,
            key: '/',
            onHotKey: () => {
                console.log('%c onHotKey() called for / ', 'color: yellow')
            },
        },
        {
            id: 1,
            key: '>',
            includeFormElements: true,
        },
        {
            id: 2,
            key: 'x',
            ctrlKey: true,
        },
        {
            id: 3,
            key: '1',
            includeFormElements: true,
            ctrlKey: true,
            shiftKey: true,
        },
    ])

    let modifierText = ''

    if (hotKey) {
        const modifiers = { altKey: 'Alt', ctrlKey: 'Ctrl', metaKey: 'Meta', shiftKey: 'Shift' }

        modifierText = Object.keys(modifiers)
            // @ts-ignore
            .map((mod) => (hotKey && hotKey[mod] ? modifiers[mod] + ' + ' : ''))
            .join('')
    }
    return (
        <div>
            <h1>React Custom Hook: useKeys</h1>
            <div>Press a key on the page body or in the input field.</div>
            <div>
                <h3>Hot Keys:</h3>
                <table style={{ width: '600px' }}>
                    <tbody>
                        <tr>
                            <td>/</td>
                            <td>should work on body</td>
                        </tr>
                        <tr>
                            <td>&gt;</td>
                            <td>should work on body and inside a form field</td>
                        </tr>
                        <tr>
                            <td>Ctrl + x </td>
                            <td>should work on body</td>
                        </tr>
                        <tr>
                            <td>Ctrl + Shift + 1</td>
                            <td>should work on body and inside a form field</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
            </div>
            <div>
                <div>Sample form field:</div>
                <input type="text" />
            </div>
            <div>
                <h3>Result:</h3>
                {hotKey ? (
                    <div>
                        &#x1F525; You pressed a hotKey &#x1F449; <strong>{modifierText + hotKey?.key}</strong> with id: {hotKey.id}
                    </div>
                ) : (
                    <div>&#x1F634; Not a hotKey</div>
                )}
            </div>
        </div>
    )
}
export default App
