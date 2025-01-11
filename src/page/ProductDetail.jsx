import axios from "axios";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { setMessage } from "../slice/messageSlice"
import { addToCart } from "../slice/cartSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [contentLoading, setContentLoading] = useState(false);
  const [productDeatil, setProductDeatil] = useState([]);
  // 產品數量 加減
  const [cartQuantity, setCartQuantity] = useState(1);

  useEffect(() => {
    getProductDetail(id);
  }, [id]);

  // 取得產品詳細資訊
  const getProductDetail = async (id) => {
    setContentLoading(false);
    try {
      const productRes = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}getProductById?id=${id}`
      );
      console.log("productRes", productRes);
      setProductDeatil(productRes?.data?.product)

      setTimeout(() => {
        setContentLoading(true);
      }, 1500);
    } catch (error) {
      dispatch(setMessage({
        type: 'ERROR',
        icon: 'error',
        title: error.message,
      }))
    }
  };

  // 加入購物車
  const addCart = () => {
    dispatch(
      addToCart({
        id: productDeatil.id,
        imageUrl: productDeatil.imageUrl,
        origin_price: productDeatil.origin_price,
        price: productDeatil.price,
        time: productDeatil.time,
        title: productDeatil.title,
        quantity: cartQuantity,
      })
    );
  };

  return (
    <>
      <Helmet>
        <title>{`產品- ${productDeatil.title}`}</title>
        <meta name="description" content="瀏覽產品詳細頁，發現您喜歡的商品！" />
        <meta name="keywords" content="產品, 商品, 網路購物" />
      </Helmet>
      {/* 顯示骨架屏 */}
      {!contentLoading && (
        <div className="flex flex-col lg:flex-row mt-16">
          <div className="m-auto w-[90%] max-w-[990px] mr-5">
            <Skeleton width="10%" height={20} />
            <Skeleton width="20%" height={20} />
            <Skeleton width="100%" height={500} />
            <Skeleton width="30%" height={20} />
            <Skeleton width="40%" height={20} />
            <Skeleton width="50%" height={20} />
            <Skeleton width="70%" height={20} />
          </div>
          <aside className="w-[90%] lg:w-[25%] m-auto mt-12 mb-11 lg:mb-0 lg:mt-0">
            <div className="border p-6 rounded-lg">
              <Skeleton width="30%" height={10} />
              <Skeleton width="50%" height={10} />
              <Skeleton width="100%" height={10} />
            </div>
          </aside>
       </div>
      )}
      {/* 內容 */}
      {contentLoading && (
        <div className="flex flex-col lg:flex-row animate-fadeIn mt-16 pb-14">
          {/* 左邊 */}
          <div className="m-auto w-[90%] max-w-[990px] mr-5">
            <h1 className="border-l-[5px] border-lime-200 pl-4 mb-2">
              {productDeatil.title}
            </h1>
            <div className="text-[14px] text-zinc-500 mb-7">{`上架時間：${new Date(productDeatil.time).getFullYear().toString()}.${(new Date(productDeatil.time).getMonth() + 1).toString()}.${new Date(productDeatil.time).getDate().toString()}`}</div>
            <div className="list-img pb-[60%] mb-5 rounded-[10px] overflow-hidden">
              <img src={`${productDeatil.imageUrl}`} />
            </div>
            {/* 編輯器內容 */}
            <div dangerouslySetInnerHTML={{ __html: productDeatil.content }}></div>
            {/* 回上一頁*/}
            <button className="sumit-btn lg:w-44 mt-16" onClick={()=>window.history.go(-1)}>回上一頁</button>
          </div>
          {/* 右邊 */}
          <aside className="w-[90%]  lg:w-auto m-auto mt-12 mb-11 lg:mb-0 lg:mt-0">
            <div className="sticky top-5 border p-6 rounded-lg mb-2">
              <div className="">
                <div className="text-[18px] font-medium">
                  <span className="text-gray-400 mr-2">建議售價</span>
                  <span className="text-gray-400 line-through">
                    {productDeatil.origin_price}
                  </span>
                </div>
                <div className="text-2xl mb-4">${productDeatil.price}</div>
              </div>
              <div className="flex mb-3">
                <button
                  className="arrw-btn"
                  onClick={() => {
                    setCartQuantity((pre) => (pre === 1 ? pre : pre - 1));
                  }}
                >
                  <FiMinus />
                </button>
                <input
                  className=" rounded-none text-center border-[1px]  p-1"
                  type="number"
                  readOnly
                  value={cartQuantity}
                />
                <button
                  className="arrw-btn"
                  onClick={() => {
                    setCartQuantity((pre) => pre + 1);
                  }}
                >
                  <FiPlus />
                </button>
              </div>
              <button className="sumit-btn" onClick={addCart}>
                加入購物車
              </button>
            </div>
          </aside>
       </div>
      )}
    </>
  );
};

export default ProductDetail;
