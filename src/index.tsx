import { useEffect, useState } from 'react'

const formElements: String[] = ['A', 'INPUT', 'TEXTAREA', 'LABEL', 'FIELDSET', 'LEGEND', 'SELECT', 'OPTGROUP', 'OPTION', 'BUTTON', 'DATALIST', 'OUTPUT']
const modifiers = { altKey: 'Alt', ctrlKey: 'Ctrl', metaKey: 'Meta', shiftKey: 'Shift' }

type KeyStroke = {
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

type useKeysPropsNew = KeyStroke[]

const useKeys = (keyStrokes: useKeysPropsNew = []) => {
    const [keyStroke, setKeyStroke] = useState<KeyStroke>(null)

    useEffect(() => {
        const fn = (evt: KeyboardEvent) => {
            if (!(Array.isArray(keyStrokes) && keyStrokes.length)) return

            console.log('evt')
            console.log(evt)

            const tag: Element | null = evt.target as Element

            if (formElements.includes(tag.tagName.toUpperCase())) {
            }

            if (tag && tag.tagName) {
                let draftKeyStroke: KeyStroke = null
                // let matchedKeyStroke = keyStrokes.find((hk) => hk?.key === evt.key && Object.keys(modifiers).every((mod) => hk && (hk[mod] === true ? !!evt[mod] : true)))
                let matchedKeyStroke = keyStrokes.find((hk) => hk?.key === evt.key && Object.keys(modifiers).every((mod) => hk && !!hk[mod] === !!evt[mod]))

                if (matchedKeyStroke) {
                    // console.log('matchedKeyStroke')
                    // console.log(matchedKeyStroke)

                    if (matchedKeyStroke.includeFormElements || !formElements.includes(tag.tagName.toUpperCase())) {
                        const { onKey, ...rest } = matchedKeyStroke
                        draftKeyStroke = { ...rest, target: tag }
                        onKey && typeof onKey === 'function' && onKey(rest)
                    }
                }

                setKeyStroke(draftKeyStroke)
            }
        }

        window.document.addEventListener('keydown', fn)

        return () => {
            window.document.removeEventListener('keydown', fn)
        }
    }, [])

    return { keyStroke }
}

export { useKeys }
