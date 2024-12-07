import { Outlet } from "react-router-dom"
import Header from "./components/layout/header/Header"


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
        <div className="m-0 col-span-12 p-5 flex justify-between items-center border border-blue-700">
          Footer
        </div>
      </div>
    </div>
  )
}

export default App


