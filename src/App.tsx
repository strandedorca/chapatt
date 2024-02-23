import { Box, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import Chat from './pages/Chat'

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { createContext, useMemo, useState } from 'react'
import { getDesignTokens } from './theme';
import { Update } from '@reduxjs/toolkit';
import Login from './pages/login/Login';
import Settings from './pages/settings/Settings';
import Home from './pages/home/Home';
import ServerIdPage from './pages/home/ServerPage';

// const ColorModeContext = createContext('dark')

function App() {
  // Dark/Light Mode Implementation
  // const [mode, setMode] = useState<PaletteMode>('dark');
  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode: PaletteMode) =>
  //         prevMode === 'light' ? 'dark' : 'light',
  //       );
  //     },
  //   }), [],
  // );
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
        <Route path="/" element={<Home />}>
          <Route index element={<ServerIdPage />} />

          <Route path="login" element={<Login />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
