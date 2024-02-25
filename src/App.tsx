import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createContext, useMemo, useState } from 'react'
import { darkTheme } from './theme';
import Settings from './pages/settings/Settings';
import Home from './pages/home/Home';
import MainLayout from './pages/home/MainLayout'
import Messages from './pages/home/main-huyen/Messages'
import FriendsPage from './pages/home/main-huyen/FriendsPage'
import AuthPage from './pages/login/AuthPage';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const handleLogIn = () => {
  //   setIsLoggedIn(!isLoggedIn);
  // }
  // Login State
  const [user] = useAuthState(auth)
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>}>
            <Route index element={<Navigate to="me" />} />
            {/* Homepage */}
            <Route element={<MainLayout />}>

              <Route path="me" element={<FriendsPage />}>
                <Route path=":userId" element={<Messages />}/>
              </Route>

              <Route path="servers" element={<Messages />}>
                <Route path=":serverId" element/>
              </Route>

            </Route>

          </Route>
          <Route path="login" element={<AuthPage />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App