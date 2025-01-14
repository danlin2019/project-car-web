import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

export function Moreproducts() {
  const { id } = useParams()
  const [isproduct,setProduct] = useState([])
  const [productLoading, setProductLoading] = useState(false)

  useEffect(()=>{
    getProducts()
  },[id])

  const getProducts = async () =>{
    setProductLoading(false)
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}allProducts`)
      const shuffledProducts = res?.data?.products.sort(() => Math.random() - 0.5)
      setProduct(shuffledProducts)

      setTimeout(()=>{
        setProductLoading(true)
      },1000)

    } catch (error) {
      
    }
  }

  return (
    <div className="mt-20">
      <div className="flex-center flex-wrap">
        <div className="text-3xl font-extrabold dark:text-white mb-10">
          更多商品
        </div>

        {!productLoading && (
          <ul className="flex justify-center w-full flex-wrap">
            {isproduct.slice(0,4).map((item,i)=>{
                return (
                  <li key={item.id} className="w-[50%] lg:w-[25%] px-2 mb-3">
                    <Skeleton width="90%" height={140} />
                    <Skeleton width="50%" height={10} />
                    <Skeleton width="30%" height={10} />
                  </li>
                )
            })}
          </ul>
        )
        }
        {productLoading &&(
          <ul className="flex justify-center w-full flex-wrap dark:text-white">
            {isproduct.slice(0,4).map((item,i)=>{
              return (
                <li key={item.id} className="w-[50%] lg:w-[25%] px-2 mb-10">
                  <Link to={`/products/${item.id}`} className="group">
                    <div className="list-img relative w-full h-0 pb-[70%] mb-3">
                      <img src={item.imageUrl} alt={item.title} className="transition duration-[0.6s] group-hover:scale-[1.15]" />
                    </div>
                  </Link>

                  <h2 className="font-bold text-[#c0ac00]">{item.title}</h2>
                  <p>價格：{item.price}</p>
                </li>
              )
            })}
          </ul>
        )}

      </div>
    
    </div>
  )
}