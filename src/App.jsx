
import {useEffect} from "react";
import { useDispatch } from "react-redux";
import { loadCartFromStorage } from "./slice/cartSlice";
import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Sliderbar } from "./components/Sliderbar";
import { Cart } from "./components/Cart";
import { Dark } from "./components/Dark";
import Notification from "./components/Notification";

import "react-loading-skeleton/dist/skeleton.css";


export function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadCartFromStorage())
  },[dispatch])

  return (
    <div className="dark:bg-night p-2 xl:px-20 xl:py-10 min-h-[100vh]">
      <Notification/>
      <Nav/>
      <Outlet/>
      <Sliderbar>
        <Cart/>
      </Sliderbar>
      <Dark/>
    </div>
  );
}


