import { useSelector } from "react-redux"
import { closeSindbar } from "../slice/uiSlice"
import { useDispatch } from "react-redux"

export function Sliderbar({children}){
  const dispatch = useDispatch()
  const menuState = useSelector((state)=>state?.ui)
  const {isSidebarOpen} = menuState
  return(
    <>
        <div className={`fixed right-0 top-0 w-full h-full transform transition duration-300 shadow-lg bg-white z-20 lg:w-[35%] md:w-[50%]
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={()=>dispatch(closeSindbar())} className="absolute right-4 top-4 p-2 font-bold">X</button>
          {children}
        </div>
        {
          isSidebarOpen && <div className="fixed left-0 top-0 z-[11] h-full w-full bg-black opacity-50"></div>
        }
    </>

   
  )
}