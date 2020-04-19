import React from 'react'

import { useHotKeys } from 'use-hot-keys'

const App = () => {
    const { hotKey, setOnHotKey } = useHotKeys({
        key: '/',
        onHotKey: (evt: KeyboardEvent) => {
            console.log('default onHotKey =', evt)
        },
    })
    // setOnHotKey((evt: KeyboardEvent) => {
    //     console.log(evt)
    // })
    return (
        <div>
            <div>
                <input type="text" />
            </div>
            <div>Hello {hotKey?.key}</div>
        </div>
    )
}
export default App
