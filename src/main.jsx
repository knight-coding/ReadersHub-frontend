import React from 'react';
import "./index.css"
import App from './App.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import StorePage from './Pages/Store.jsx';
import About from './Pages/About.jsx';
import Layout from './Layout.jsx';
import Home from './Pages/Home.jsx';
import { createRoot } from 'react-dom/client'
import LoginPage from './Pages/Login.jsx';
import Signup from './Pages/Signin.jsx';
import Explore from './Pages/Explore.jsx';
import Account from './Pages/Account.jsx';
import AddBook from './Pages/AddBook.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import ReadBook from './Pages/ReadBook.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
        <Route index element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/About' element={<About />}/>
        <Route path='/store' element={<StorePage />}/>
        <Route path='/explore' element={<Explore />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signin' element={<Signup />}/>
        <Route path='/account' element={<Account />}/>
        <Route path='/addBook' element={<AddBook />}/>
    </Route>
    <Route path="/read" element={<ReadBook />} />
    </>
  )
)


createRoot(document.getElementById('root')).render(  
  <>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </>
)
