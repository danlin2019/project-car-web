import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton";


export function NewArrivalsSection() {

  const [isproduct,setProduct] = useState([])
  const [productLoading, setProductLoading] = useState(false)

  useEffect(()=>{
    getProducts()
  },[])

  const getProducts = async () =>{
    setProductLoading(false)
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}allProducts`)
      setProduct(res?.data?.products)

      setTimeout(()=>{
        setProductLoading(true)
      },1000)

    } catch (error) {
      
    }
  }

  return (
    <div className="mt-20">
      <div className="flex-center flex-wrap">
        <div className="bg-[url('./assets/lines.png')] bg-center text-4xl font-extrabold dark:text-white mb-10">
          NEW ARRIVALS
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
          <ul className="flex justify-center w-full flex-wrap">
            {isproduct.slice(0,4).map((item,i)=>{
              return (
                <li key={item.id} className="w-[50%] lg:w-[25%] px-2 mb-3">
                  <Link to={`products/${item.id}`} className="group">
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