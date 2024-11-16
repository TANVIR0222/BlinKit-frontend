import { Outlet, useLocation } from "react-router-dom"
import Header from "./shared/Header"
import Footer from "./shared/Footer"


function App() {

  const location = useLocation();

  const path = location.pathname.includes('/login') ||  location.pathname.includes('/register')

  return (
    <>
     { path || <Header />}
      <Outlet />
      {path || <Footer /> }
    </>
  )
}

export default App
