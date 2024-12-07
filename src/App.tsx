import { Outlet } from "react-router-dom"
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"


function App() {


  return (
    <div className="m-0 p-0 font-normal min-h-screen box-border">
      <div className="m-auto content-center grid gap-2 border border-bleck min-h-screen"
      style={{
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        gridTemplateRows: "auto 1fr auto"
      }}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App


