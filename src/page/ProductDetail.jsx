import axios from "axios"
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from '../slice/cartSlice';
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom";


const ProductDetail = () =>{
  const dispatch = useDispatch()
  const {id} = useParams()
  const [productDeatil,setProductDeatil] = useState([])
  // 產品數量 加減
  const [cartQuantity,setCartQuantity] = useState(1)

  useEffect(()=>{
    getProductDetail(id)
  },[id])

  // 取得產品詳細資訊
  const getProductDetail = async(id) =>{
    try {
      const productRes = await axios.get(`${import.meta.env.VITE_APP_API_URL}getProductById?id=${id}`)
      console.log('productRes',productRes)
      setProductDeatil(productRes?.data?.product)
      console.log('讀取結束')
    } catch (error) {
      console.log(error)
    }
  
  }

  // 加入購物車
  const addCart = () =>{
    console.log('productDeatil',cartQuantity,productDeatil)
    dispatch(
      addToCart({
        id:productDeatil.id,
        imageUrl: productDeatil.imageUrl,
        origin_price: productDeatil.origin_price,
        price: productDeatil.price,
        time: productDeatil.time,
        title: productDeatil.title,
        quantity:cartQuantity
      })
    )
  }

  return(
    <div className="flex animate-fadeIn mt-16">
      {/* 左邊 */}
      <div className=" w-[90%] max-w-[990px] mr-5">
        <h1 className="border-l-[5px] border-lime-200 pl-4 mb-2">{productDeatil.title}</h1>
        <div className="text-[14px] text-zinc-500 mb-7">{`上架時間：${new Date(productDeatil.time).getFullYear().toString()}.${(new Date(productDeatil.time).getMonth()+1).toString()}.${new Date(productDeatil.time).getDate().toString()}`}</div>
          <div className="mb-5 rounded-[10px] overflow-hidden">
          <img className="w-full" src={`${productDeatil.imageUrl}`} />
        </div>
        {/* 編輯器內容 */}
        <div className=""  dangerouslySetInnerHTML={{ __html: productDeatil.content }} >
        </div>
      </div>
      {/* 右邊 */}
      <aside className="">
        <div className="sticky top-5 border p-6 rounded-lg mb-2">
          <div className="">
            <div className="text-[18px] font-medium">
              <span className="text-gray-400 mr-2">建議售價</span>
              <span className="text-gray-400 line-through">{productDeatil.origin_price}</span>
              </div>
            <div className="text-2xl mb-4">${productDeatil.price}</div>
           
          </div>
          <div className="flex mb-3">
            <button className="arrw-btn" onClick={()=>{setCartQuantity((pre) => pre === 1 ? pre : pre - 1)}}><FiMinus /></button>
            <input className="text-center border-[1px]  p-1" type="number" readOnly value={cartQuantity}/>
            <button className="arrw-btn" onClick={()=>{setCartQuantity((pre) => pre + 1)}}><FiPlus /></button>
          </div>
          <button className="sumit-btn" onClick={addCart}>加入購物車</button>
        </div>

       
      </aside>
    </div>
  )
}

export default ProductDetail