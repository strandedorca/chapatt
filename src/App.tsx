import { Outlet, createBrowserRouter } from 'react-router-dom'
import './App.css'
import SidebarPage from './pages/SideBar/SidebarPage'

function Layout () {
  
}

function App() {
  return (
    <>
      <SidebarPage/>
      <Outlet/>
    </>
  )
}

export default App
