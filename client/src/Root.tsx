import {Outlet} from "react-router-dom"
import { Navbar } from "scenes/navbar"

export const Root =()=>{
  return(
    <>
    <div>
    <Navbar />
    </div>
    <div>
     <Outlet />
    </div>
    </>
  )
}