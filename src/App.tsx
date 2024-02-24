import { Box, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import Chat from './pages/home/main/Chat'

import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { createContext, useMemo, useState } from 'react'
import { getDesignTokens } from './theme';
import { Update } from '@reduxjs/toolkit';
import Login from './pages/login/Login';
import Settings from './pages/settings/Settings';
import Home from './pages/home/Home';
import DirectMessages from './pages/home/main/DirectMessages'
import MainLayout from './pages/home/MainLayout'

// const ColorModeContext = createContext('dark')


import "bootstrap/dist/css/bootstrap.min.css";
import Messages from './pages/home/main-huyen/Messages'
import FriendsPage from './pages/home/main-huyen/FriendsPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogIn = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  // Dark/Light Mode Implementation
  // const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (

    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <Box id="navigation-bar">
    //     </Box>
    //     <Box component="main">
    //       <Outlet />
    //     </Box>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login"/>}>
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
        <Route path="login" element={<Login onLogIn={handleLogIn}/>} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )

}



export default App