import {useEffect} from "react";
import { useDispatch } from "react-redux";
import { loadCartFromStorage } from "./slice/cartSlice";
import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Sliderbar } from "./components/Sliderbar";
import { Cart } from "./components/Cart";
import { Dark } from "./components/Dark";


export function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadCartFromStorage())
  },[dispatch])

  return (
    <div className="dark:bg-night animate-fadeIn p-10 xl:px-24">
      <Nav/>
      <Outlet/>
      <Sliderbar>
        <Cart/>
      </Sliderbar>
      <Dark/>
    </div>
  );
}


