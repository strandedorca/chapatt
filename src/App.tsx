import { Outlet, createBrowserRouter } from 'react-router-dom'
import './App.css'
import SidebarPage from './pages/SideBar/SidebarPage'

const router = createBrowserRouter([
  {path: "/", element: <Layout/> }
])

function Layout () {
  
}

function App() {
  return (
    <>
<<<<<<< Updated upstream
      <SidebarPage/>
=======
      <Outlet/>
>>>>>>> Stashed changes
    </>
  )
}

export default App
