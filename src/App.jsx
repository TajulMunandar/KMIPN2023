import {useRoutes} from 'react-router-dom'

// route
import UserDashboard from './pages/dashboard/UserDashboard'
import KategoriDashboard from './pages/dashboard/KategoriDashboard'
import BarangLaporan from './pages/dashboard/laporan/BarangLaporan'
import PeminjamanLaporan from './pages/dashboard/laporan/PeminjamanLaporan'
import Peminjaman from './pages/Peminjaman'
import Logins from './pages/auth/Logins'
import HomeDashboard from './pages/dashboard/HomeDashboard'
import BarangDashboard from './pages/dashboard/BarangDashboard'
import BarangHabisDashboard from './pages/dashboard/barang/BarangHabisDashboard'
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
    {
      path: '/dashboard-laporan-barang',
      element: <BarangLaporan/>
    },
    {
      path: '/dashboard-laporan-peminjaman',
      element: <PeminjamanLaporan/>
    },
    {
      path: '/dashboard-kategori',
      element: <KategoriDashboard/>
    },
    {
      path: '/dashboard-user',
      element: <UserDashboard/>
    },
  ])

  return (
    <>
      {routes}
    </>

  )
}

export default App
