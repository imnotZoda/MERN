import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AdminSidebar from './layouts/AdminSidebar';

import Home from './Home'

import ProductList from './pages/product/ProductList';
import ProductCreate from './pages/product/ProductCreate';

import CategoriesList from './pages/category/CategoriesList';
import CategoryCreate from './pages/category/CategoryCreate';
import ProductUpdate from './pages/product/ProductUpdate';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import { auth } from './utils/firebase';
import Cart from './pages/Cart';
import OrdersList from './pages/order/OrdersList';

import { getToken } from "firebase/messaging"
import { messaging } from './utils/firebase';

function App() {
  const [user, setUser] = useState(null)

  const requestPermission = async () => {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BHJEtgBYusoTixGiCiJBaTd96UgsN4UavQBYo9AlsfNekkaEvCRCUm0WMCPtT0HNed0WH7e9FgdEKzaW_UdUXsA",
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    requestPermission()
  }, [])



  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User Route */}

          <Route path='/register' element={user ? <Navigate to={'/products/list'} /> : <Register />} />
          <Route path='/login' element={user ? <Navigate to={'/products/list'} /> : <Login />} />

          <Route path='/' element={<Home />} />

          {/* <Route path='/cart' element={user ? <Cart /> : <Navigate to={'/login'} />} /> */}
          <Route path='/cart' element={<Cart />} />

          {/* category CRUD  */}
          <Route path='/categories/list' element={<CategoriesList />} />
          <Route path='/categories/create' element={<CategoryCreate />} />

          {/* product CRUD  */}
          <Route path='/products/list' element={<ProductList />} />
          <Route path='/products/create' element={<ProductCreate />} />
          <Route path='/products/update/:id' element={<ProductUpdate />} />


          {/* orders */}
          <Route path='orders'
            element={user ? <OrdersList /> : <Navigate to={'/login'} />}
          />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
