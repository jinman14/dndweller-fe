import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
 https://www.google.com/url?sa=i&url=https%3A%2F%2Fed.fandom.com%2Fwiki%2FPlank&psig=AOvVaw1zQ7xVDx69yQ_oXuixchbL&ust=1744917994490000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIiqhJyk3YwDFQAAAAAdAAAAABAE         count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
