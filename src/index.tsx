import { useEffect, useState } from 'react'

const formElements: String[] = ['A', 'INPUT', 'TEXTAREA', 'LABEL', 'FIELDSET', 'LEGEND', 'SELECT', 'OPTGROUP', 'OPTION', 'BUTTON', 'DATALIST', 'OUTPUT']
const modifiers = { altKey: 'Alt', ctrlKey: 'Ctrl', metaKey: 'Meta', shiftKey: 'Shift' }

type HotKey = {
    id: String | Number
    key: String
    includeFormElements?: Boolean
    altKey?: Boolean
    ctrlKey?: Boolean
    metaKey?: Boolean
    shiftKey?: Boolean
    target?: Element
    onHotKey?: Function
} | null

type useKeysPropsNew = HotKey[]

const useKeys = (hotKeys: useKeysPropsNew = []) => {
    const [hotKey, setHotKey] = useState<HotKey>(null)

    useEffect(() => {
        const fn = (evt: KeyboardEvent) => {
            if (!(Array.isArray(hotKeys) && hotKeys.length)) return

            // console.log('evt')
            // console.log(evt)

            const tag: Element | null = evt.target as Element

            if (formElements.includes(tag.tagName.toUpperCase())) {
            }

            if (tag && tag.tagName) {
                let draftHotKey: HotKey = null
                let matchedHotKey = hotKeys.find((hk) => hk?.key === evt.key && Object.keys(modifiers).every((mod) => hk && (hk[mod] === true ? !!evt[mod] : true)))

                if (matchedHotKey) {
                    // console.log('matchedHotKey')
                    // console.log(matchedHotKey)

                    if (matchedHotKey.includeFormElements || !formElements.includes(tag.tagName.toUpperCase())) {
                        const { onHotKey, ...rest } = matchedHotKey
                        draftHotKey = { ...rest, target: tag }
                        onHotKey && typeof onHotKey === 'function' && onHotKey(rest)
                    }
                }

                setHotKey(draftHotKey)
            }
        }

        window.document.addEventListener('keydown', fn)

        return () => {
            window.document.removeEventListener('keydown', fn)
        }
    }, [])

    return { hotKey }
}

export { useKeys }
