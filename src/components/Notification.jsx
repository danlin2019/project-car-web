
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { loadCartFromStorage } from "../slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { clearMessage } from "../slice/messageSlice";


const Notification = () => {
  const swaData = useSelector((state) => state?.message)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(swaData.type === 'SUBMITCART'){
      Swal.fire({
        title: swaData.title,
        icon: swaData.icon,
        confirmButtonText: "確認",
      }).then((res)=>{
        if(res.isConfirmed){
          dispatch(clearMessage())
          localStorage.clear()
          dispatch(loadCartFromStorage())
          navigate('/')
        }
      })
    }
    if(swaData.type === 'ERROR'){
      Swal.fire({
        title: swaData.title,
        icon: swaData.icon,
        confirmButtonText: "確認",
      }).then((res)=>{
        if(res.isConfirmed){
          dispatch(clearMessage())
        }
      })
    }
  },[swaData.type])


  return (
    <></>

  )
}

export default Notification;
