import { useEffect, useRef, useState } from 'react'

const formElements: String[] = ['A', 'INPUT', 'TEXTAREA', 'LABEL', 'FIELDSET', 'LEGEND', 'SELECT', 'OPTGROUP', 'OPTION', 'BUTTON', 'DATALIST', 'OUTPUT']

type useHotKeysProps = {
    key: String
    onHotKey: Function
}

const useHotKeys = ({ key, onHotKey }: useHotKeysProps) => {
    const [hotKey, setHotKey] = useState<KeyboardEvent | null>(null)
    const callback = useRef(onHotKey)
    // callback.current = onHotKey

    const setOnHotKey = (fn: Function) => {
        callback.current = fn
    }

    useEffect(() => {
        const fn = (evt: KeyboardEvent) => {
            const tag: Element | null = evt.target as Element
            if (!formElements.includes(tag?.tagName?.toUpperCase())) {
                const modifiers = { altKey: 'Alt', ctrlKey: 'Ctrl', shiftKey: 'Shift' }
                const keyValue =
                    Object.keys(modifiers)
                        .map((mod) => (evt[mod] ? modifiers[mod] + ' + ' : ''))
                        .join('') + evt.key
                console.log('key = ', keyValue)
                console.log('=========================')

                let val = null
                if ((key == null || key.includes(evt.key)) && typeof callback.current === 'function') {
                    val = evt
                }
                setHotKey(val)
                callback.current(val)
            }
        }

        window.document.addEventListener('keyup', fn)

        return () => {
            window.document.removeEventListener('keyup', fn)
        }
    }, [])

    return { hotKey, setOnHotKey }
}

useHotKeys.defaultProps = {
    match: '/',
    onHotKey: () => {},
}

export { useHotKeys }
