import { useEffect, useState } from 'react'

const formElements: String[] = ['A', 'INPUT', 'TEXTAREA', 'LABEL', 'FIELDSET', 'LEGEND', 'SELECT', 'OPTGROUP', 'OPTION', 'BUTTON', 'DATALIST', 'OUTPUT']
const modifiers = { altKey: 'Alt', ctrlKey: 'Ctrl', metaKey: 'Meta', shiftKey: 'Shift' }

type KeyState = {
    id: String | Number
    key: String
    includeFormElements?: Boolean
    altKey?: Boolean
    ctrlKey?: Boolean
    metaKey?: Boolean
    shiftKey?: Boolean
    target?: Element
    onKey?: Function
} | null

type useKeysPropsNew = KeyState[]

const useKeys = (keyStates: useKeysPropsNew = []) => {
    const [keyState, setKeyState] = useState<KeyState>(null)

    useEffect(() => {
        const fn = (evt: KeyboardEvent) => {
            if (!(Array.isArray(keyStates) && keyStates.length)) return

            console.log('evt')
            console.log(evt)

            const tag: Element | null = evt.target as Element

            if (formElements.includes(tag.tagName.toUpperCase())) {
            }

            if (tag && tag.tagName) {
                let draftKeyState: KeyState = null
                // let matchedKeyState = keyStates.find((hk) => hk?.key === evt.key && Object.keys(modifiers).every((mod) => hk && (hk[mod] === true ? !!evt[mod] : true)))
                let matchedKeyState = keyStates.find((hk) => hk?.key === evt.key && Object.keys(modifiers).every((mod) => hk && !!hk[mod] === !!evt[mod]))

                if (matchedKeyState) {
                    // console.log('matchedKeyState')
                    // console.log(matchedKeyState)

                    if (matchedKeyState.includeFormElements || !formElements.includes(tag.tagName.toUpperCase())) {
                        const { onKey, ...rest } = matchedKeyState
                        draftKeyState = { ...rest, target: tag }
                        onKey && typeof onKey === 'function' && onKey(rest)
                    }
                }

                setKeyState(draftKeyState)
            }
        }

        window.document.addEventListener('keydown', fn)

        return () => {
            window.document.removeEventListener('keydown', fn)
        }
    }, [])

    return { keyState }
}

export { useKeys }
