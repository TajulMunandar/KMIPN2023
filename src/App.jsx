import { lazy } from 'react'
import {useRoutes} from 'react-router-dom'
// import Home from './pages/home'
import Peminjaman from './pages/Peminjaman'
import Logins from './pages/auth/Logins'
import HomeDashboard from './pages/dashboard/HomeDashboard'
import BarangDashboard from './pages/dashboard/BarangDashboard'
import PeminjamanDashboard from './pages/dashboard/PeminjamanDashboard'
import Home from './pages/Home'


function App() {
  const routes = useRoutes([
    {
      path: '/',
      element:<Home />
    },
    {
      path: '/peminjaman',
      element: <Peminjaman />
    },
    {
      path: '/login',
      element: <Logins />
    },
    {
      path: '/dashboard',
      element: <HomeDashboard />
    },
    {
      path: '/dashboard-barang',
      element: <BarangDashboard />
    },
    {
      path: '/dashboard-peminjaman',
      element: <PeminjamanDashboard />
    },
  ])

  return (
    <>
      {routes}
    </>

  )
}

export default App
