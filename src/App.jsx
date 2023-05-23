import { useState } from 'react'
import {useRoutes} from 'react-router-dom'
import Home from './pages/home'
import Peminjaman from './pages/Peminjaman'
import Logins from './pages/Logins'
import "./assets/css/index.css"


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
    {
      path: '/login',
      element: <Logins />
    },
  ])

  return (
    <>
      {routes}
    </>

  )
}

export default App
