import { useState } from 'react'
import {useRoutes} from 'react-router-dom'
import Home from './pages/home'
import Peminjaman from './pages/Peminjaman'
import "./index.css"


function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/peminjaman',
      element: <Peminjaman />
    },
  ])

  return (
    <>
      {routes}
    </>

  )
}

export default App
