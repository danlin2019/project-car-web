import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "../slice/messageSlice"
import Skeleton from "react-loading-skeleton";
import Pagination from "../components/Pagination";

const ProductPage = () => {
  const dispatch = useDispatch()
  const [productLoading, setProductLoading] = useState(false);
  const [products, setProducts] = useState([]); //取得資料
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    hasNext: false,
    hasPrev: false,
    totalPages: 0,
    totalProducts: 0,
  });

  // 取得 query string 
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const listCurrentPage = Number(params.get('list')) || 1
    getProducts(listCurrentPage)
  }, [location.search]);

  //取的 產品列表 api
  const getProducts = async (page) => {
    setProductLoading(false);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}allProducts`,
        {
          params: {
            page: page,
            pageSize: pagination.pageSize,
          },
        }
      )
      setProducts(res.data.products);
      // 需立即更新
      setPagination({
        ...res.data.pagination,
        currentPage: page,
      })
      navigate(`?list=${page}`)
      setTimeout(()=>{
        setProductLoading(true)
      },1500)
    } catch (error) {
      dispatch(setMessage({
        type: 'ERROR',
        icon: 'error',
        title: error.message,
      }))
    }
  }

  return (
    <>
   
      
      <div className="content-box">
        <h2 className="border-l-[5px] border-lime-200 pl-4 text-2xl font-bold mb-10">
          商品列表
        </h2>
        {/* 顯示骨架屏 */}
        {!productLoading && (
          <ul className="flex flex-wrap">
            {[...Array(8)].map((_, index) => (
              <li
                key={index}
                className="w-[50%] lg:w-[25%] px-2 mb-10 text-center text-xs"
              >
                <div className="">
                  <Skeleton width="80%" height={100} />
                </div>
                <div>
                  <span>
                    <Skeleton width="60%" height={10} />
                  </span>
                </div>
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={20} />
              </li>
            ))}
          </ul>
        )}
        {/* 列表 */}
        {productLoading && (
          <ul className="flex flex-wrap">
            {products &&
              products.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="w-[50%] lg:w-[25%] px-2 mb-10 text-center text-xs"
                  >
                    <Link to={`/products/${item.id}`} className="group">
                      <div className="list-img relative w-full h-0 pb-[70%] mb-3">
                        <img src={item.imageUrl} alt={item.title} className="transition duration-[0.6s] group-hover:scale-[1.15]" />
                      </div>
                      <div>
                        <span className="pr-1">上架時間:</span>
                        {`${new Date(item.time).getFullYear().toString()}.${(new Date(item.time).getMonth() + 1).toString()}.${new Date(item.time).getDate().toString()}`}
                      </div>
                      <h2 className="font-bold">{item.title}</h2>
                      售價 {item.price}
                    </Link>
                  </li>
                );
              })}
          </ul>
        )}
        {/* 分頁 */}
        {productLoading && (
          <Pagination pagination={pagination} chanegePage={getProducts}/>
        )}
      </div>
    </>
  );
};

export default ProductPage;
