import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { allRouters } from "./Components/AllRouter"
function App() {

const router=createBrowserRouter(allRouters)
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
