import { useState } from 'react'
import './App.css'

import Form from './components/Form'
import Cart from './components/Cart'

function App() {
  const [count, setCount] = useState(0)
  return (
    <main>
        <Form />
        <Cart />
    </main>

  )
}

export default App
