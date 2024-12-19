import { Outlet, useLocation } from "react-router-dom"
import Header from "./shared/Header"
import Footer from "./shared/Footer"
import CartMobileOnly from "./components/common/CartMobileOnly";


function App() {

  const location = useLocation();

  const path = location.pathname.includes('/Login') ||  location.pathname.includes('/register')  || location.pathname.includes('/forgot-password')  || location.pathname.includes('/verification-opt') 

  return (
    <>
     { path || <Header />}
      <Outlet />
      {location.pathname !== '/checkOut' &&  <CartMobileOnly /> }
      {path || <Footer /> }
    </>
  )
}

export default App
