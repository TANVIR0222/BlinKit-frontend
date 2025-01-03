
import App from '@/App';
import ProductDisplayPage from '@/components/common/ProductDisplayPage';
import AdminPermition from '@/Layout/AdminPermition';
import Dashboard from '@/Layout/Dashboard';
import Category from '@/page/adminPage/Category';
import Product from '@/page/adminPage/Product';
import SubCategory from '@/page/adminPage/SubCategory';
import UploadeProduct from '@/page/adminPage/UploadeProduct';
import ForgotPassword from '@/page/auth/ForgotPassword';
import Login from '@/page/auth/Login';
import OTPverify from '@/page/auth/OTPverify';
import Profile from '@/page/auth/Profile';
import Register from '@/page/auth/Register';
import ResetPassword from '@/page/auth/ResetPassword';
import HomePage from '@/page/Home/HomePage';
import ProductListPage from '@/page/Home/ProductListPage';
import Address from '@/page/myInformations/Address';
import MyOrder from '@/page/myInformations/MyOrder';
import SearchPage from '@/page/search/SearchPage';
import EditeProducAdmin from '@/components/common/EditeProducAdmin';
import {createBrowserRouter} from 'react-router-dom'
import CheckOut from '@/components/common/CheckOut';
import Success from '@/components/common/Success';
import Cancle from '@/components/common/Cancle';



export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/verification-opt",
          element: <OTPverify />,
        },
        {
          path: "/resrt-password",
          element: <ResetPassword />,
        },
        {
          path: "checkOut",
          element: <CheckOut />,
        },
        {
          path: "success",
          element: <Success />,
        },
        {
          path: "cancel",
          element: <Cancle />,
        },
        
        {
          path: "dashboard",
          element: <Dashboard />,
          children:[
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "order",
              element: <MyOrder />,
            },
            {
              path: "address",
              element: <Address />,
            },
            {
              path: "category",
              element: <AdminPermition><Category /></AdminPermition> ,
            },
            {
              path: "sub-category",
              element: <AdminPermition><SubCategory /></AdminPermition>,
            },
            {
              path: "uploade-product",
              element: <AdminPermition><UploadeProduct /></AdminPermition>,
            },
            {
              path: "product",
              element: <AdminPermition><Product /></AdminPermition>,
            },
            {
              path: "productEdite/:id",
              element: <AdminPermition> <EditeProducAdmin /></AdminPermition>,
            },
          ]
        },
        {
          path : "subCategory/:id",
          element : <ProductListPage/>
        },
        {
          path: "productView/:id",
          element: <ProductDisplayPage />
        },
        
        {
          path: ":id",
        }
      ]
    },
  ]);