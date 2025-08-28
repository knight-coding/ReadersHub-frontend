import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Home from './Pages/Home'
import Footer from './Components/Footer/Footer'
import BookCard from './Components/bookCard'
import Store from './Pages/Store'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Home/>
      <Footer/>
    </>
  )
}

export default App
