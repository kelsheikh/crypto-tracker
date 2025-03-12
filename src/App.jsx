import { useState } from 'react'
import CryptoPrice from "./components/CryptoPrice";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function App() {

  return (
    <>
<div className="container mt-5">
      <h1 className="text-center">Crypto Price Tracker</h1>
      <CryptoPrice />
    </div>
    </>
  )
}

export default App
