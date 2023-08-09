import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';

const router = createBrowserRouter([
  {
    path: "/",
    element : <Layout />,
    children: [
      {
        path : "/",
        element : <Public />
      },
      {
        path : "/login",
        element : <Login />
      },
      {
        path: "/dash",
        element: <DashLayout />,
        children: [
          {
            path: "welcome",
            element: <Welcome />
          },
          {
            path: 'notes',
            element: <NotesList />
          },
          {
            path: 'users',
            element: <UsersList />
          }
        ]
      },
      
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

 
