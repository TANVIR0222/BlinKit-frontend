import { Outlet } from "react-router-dom"
import Header from "./shared/Header"
import Footer from "./shared/Footer"


function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
