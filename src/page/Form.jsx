import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setMessage } from "../slice/messageSlice"
import { useDispatch } from "react-redux"
import Loading from "../components/Loading"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"



// 表單元件
const FormField = ({ id, label, type = "text", register, errors }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1">{label}</label>
    <input
      id={id}
      type={type}
      className={`input ${errors[id] ? "border-red-500" : ""}`}
      {...register(id)}
    />
    {errors[id] && <div className="error">{errors[id].message}</div>}
  </div>
);

// 表單驗證
const schema = Yup.object().shape({
  name: Yup.string().required('姓名必填'),
  email:Yup.string()
    .email('請輸入正確email')
    .required('email必填'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, '電話必須是10碼')
    .required('電話必填'),
  address: Yup.string().required('地址必填'),
})

const Form = () =>{
  const dispatch = useDispatch()
  const {items,totalMoney,totalQuantity} = useSelector((state) => state?.cart)
  const [isLoading,setIsLoading] = useState(false)
  const {
    register, //欄位
    handleSubmit, //提交表單
    formState: {errors} //表單狀態與錯誤
  } = useForm({
      resolver: yupResolver(schema)
  })

  const onSubmit = async (data) =>{
    setIsLoading(true)
   
    const submitData = {
      ...data,
      items
    }
    console.log(submitData)
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}createOrder`,submitData)
      console.log('res',res)
      const {success,message} = res.data
      setIsLoading(false)
      if(success){
        dispatch(setMessage({
          type: 'SUBMITCART',
          icon: 'success',
          title: message,
        }))
      }
    } catch (error) {
      console.log('error',error)
    }
  }



  return(
   <>
    <Loading isLoading={isLoading}/>
    <div className="content-box">
      <h2 className="text-2xl font-bold mb-5">填寫個人資訊</h2>
       <div className="flex flex-col items-baseline lg:flex-row justify-between">
        <form className="w-full lg:w-[50%] mr-5" onSubmit={handleSubmit(onSubmit)}>
            <FormField id="name" label="姓名" register={register} errors={errors} />
            <FormField id="email" label="Email" type="email" register={register} errors={errors} />
            <FormField id="phone" label="電話" type="tel" register={register} errors={errors} />
            <FormField id="address" label="寄送地址" register={register} errors={errors} />
            <div className="flex mt-10">
              <Link to="/Products" className="buy-btn mr-3">繼續購物</Link>
              <button type='submit' className="buy-btn">送出表單</button>
            </div>
        </form>
        <div className="w-full lg:w-[35%] border p-4 mb-4">
            <h2 className="font-bold mb-3">商品詳細</h2>
            <ul>
              {items.map((item)=>{
                return (
                  <li key={item.id} className="flex flex-wrap border-b pb-3 mb-3">
                    <div className="relative w-[90px] h-[45px] overflow-hidden mr-3">
                      <img
                        className=" absolute w-full h-full top-0 object-cover"
                        src={item.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className=" w-[calc(100%-105px)] relative text-xs">
                      <h2 className="mb-2">{item.title}</h2>
                      <div className="flex items-center mb-1">
                        <div className="text-gray-400 line-through mr-2">
                          原價 {item.origin_price}
                        </div>
                        <div>售價 ${item.price}</div>
                      </div>
                      {/* 數量 */}
                      <div className="text-red-700 font-medium">數量 x {item.quantity}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 text-xl">
              總計 {totalQuantity} 件 $NT<span className="text-red-700 font-bold">{totalMoney}</span>
            </div>
        </div>
       </div> 
    </div>
   </>

  )
}

export default Form



