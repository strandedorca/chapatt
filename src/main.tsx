import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit/react';
import currentUserReducer from './redux-slices/currentUserSlice.tsx';
import messagesReducer from './redux-slices/messagesSlice.tsx';
import userReducer from './redux-slices/userSlice.tsx';
import friendsReducer from './redux-slices/friendsSlice.tsx';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    messages: messagesReducer,
    user: userReducer,
    friends: friendsReducer,
  },
  
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
