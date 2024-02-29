import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit/react';
import currentUserReducer from './redux-slices/currentUserSlice.tsx';
import messagesReducer from './redux-slices/messagesSlice.tsx';
import friendsReducer from './redux-slices/friendsSlice.tsx';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    messages: messagesReducer,
    friends: friendsReducer,
  },

})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
