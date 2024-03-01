import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createContext, useEffect, useMemo, useState } from 'react'
import { darkTheme } from './theme';
import Settings from './pages/settings/Settings';
import Home from './pages/home/Home';
import MainLayout from './pages/home/MainLayout'
import Messages from './pages/home/main-huyen/Messages'
import FriendsPage from './pages/home/main-huyen/FriendsPage'
import AuthPage from './pages/login/AuthPage';
import { auth, db } from './firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { addUserDocument, getUserDocument } from './redux-slices/currentUserSlice';
import { useDispatch } from 'react-redux';

export const WidthContext = createContext('240px');

function App() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const modalWidth = '240px';

  // Create a user doc when signing in with Google for the first time
  useEffect(() => {
    if (user) {
      // Check if user is already created
      const onChangeUser = async () => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          dispatch(addUserDocument(user) as any);
        }
        dispatch(getUserDocument(user) as any);
      };
      onChangeUser();
    }
  }, [user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <WidthContext.Provider value={modalWidth}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}>
              {/* <Route path="/" element={<Home />} > */}
              <Route index element={<Navigate to="me" />} />
              {/* Homepage */}
              <Route element={<MainLayout />}>
                <Route path="me/:username" element={<Messages />} />
                <Route path="me" element={<FriendsPage />}>
                  <Route path=":username" element={<Messages />} />
                </Route>
                <Route path="servers/:serverId" element />
                <Route path="servers" element={<Messages />}>
                  <Route path=":serverId" element />
                </Route>
              </Route>
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route path="login" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </WidthContext.Provider>
    </ThemeProvider>
  )
}

export default App