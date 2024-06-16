import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from './pages/Home.jsx'
import {Provider} from "react-redux"
import store from "./store/store.js"
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import AllOrders from './pages/AllOrders.jsx'
import SingleDish from './pages/SingleDish.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import AddDish from './pages/AddDish.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
                <SignIn />
          </AuthLayout>
        ),
    },
    {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
                <SignUp />
          </AuthLayout>
        ),
    },
      {
        path: "/allOrders",
        element: (
          <AuthLayout authentication>
                <AllOrders />
          </AuthLayout>
        )
      },
      {
        path: "/singleDish/:dishId",
        element: (
          <AuthLayout authentication>
                <SingleDish />
          </AuthLayout>
        )
      },
      {
        path: "/addDish",
        element: (
          <AuthLayout authentication>
                <AddDish />
          </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
