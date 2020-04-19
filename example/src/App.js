import React from 'react'

import { useMyHook } from 'use-hot-keys'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
