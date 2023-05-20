import { useState } from 'react'
import Navigationbar from './component/Navigationbar'
import Footer from './component/Footer'
import Home from './pages/home'
import "./index.css"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='body'>
      {/* Navbar */}
      <Navigationbar/>
      {/* End Navbar */}

      {/* Home */}
      <Home/>
      {/* Home */}

      {/* footer */}
      <Footer/>
      {/* End footer */}
    </div>
    </>
  )
}

export default App
