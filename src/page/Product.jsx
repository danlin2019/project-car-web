import axios from "axios"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom";

const ProductPage = () =>{
  const [products,setProducts] = useState([]) //取得資料
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    hasNext: false,
    hasPrev: false,
    totalPages: 0,
    totalProducts: 0,
  });


  useEffect(()=>{
    getProducts()
  },[])

  //取的 產品列表 api
  const getProducts = async (page = 1)=>{
    console.log('讀取中')
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}allProducts`,
      {
        params: {
          page: page,
          pageSize: pagination.pageSize,
        },
      }
    );
    console.log('res.data.products',res.data)
    console.log('讀取結束')

    setProducts(res.data.products)
    // 需立即更新
    setPagination({
      ...res.data.pagination,
      currentPage: page,
    });


  }  


  return(
    <div className="animate-fadeIn mt-16">
      <ul className="flex">
        {products && products.map((item)=>{
          return(
            <li key={item.id} className="w-[25%] max-w-[250px] px-2 text-center">
              <Link to={`/products/${item.id}`}>
                <div className="list-img">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div><span>上架時間:</span>{`${new Date(item.time).getFullYear().toString()}.${(new Date(item.time).getMonth()+1).toString()}.${new Date(item.time).getDate().toString()}`}</div>
                <h2 className="">{item.title}</h2>
                售價 {item.price} 
              </Link>
            </li>
          ) 

        })}
      
      </ul>
    </div>
  )
}

export default ProductPage