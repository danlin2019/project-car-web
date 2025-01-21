import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { delectCart, selectCartNum } from "../slice/cartSlice";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const CartDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isdefault, setIsDefault] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const productDetail = useSelector((state) => state?.cart?.items);
  const totalQuantity = useSelector((state) => state?.cart?.totalQuantity);
  const total = useSelector((state) => state?.cart.totalMoney);

  // 變更金額
  const updateCartItem = (num, products) => {
    dispatch(
      selectCartNum({
        id: products.id,
        price: products.price,
        quantity: Number(num),
      })
    );
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    } else if (productDetail?.length === 0) {
      setIsDefault("你的購物車中沒有任何商品");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [productDetail, isLoading]);

  return (
    <>
      <Helmet>
        <title>購物明細</title>
        <meta name="description" content="購物明細" />
        <meta name="keywords" content="產品, 商品, 網路購物" />
      </Helmet>
      <div className="content-box">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">購物明細</h2>
          <ul className="space-y-5">
            <span
              className="text-center block text-[#ccc] py-3"
              dangerouslySetInnerHTML={{ __html: isdefault }}
            ></span>
            {productDetail.map((products) => {
              return (
                <li key={products.id} className="group relative border-b">
                  <Link
                    className="flex group-hover:bg-[#d9f99d] transition duration-300 p-3 mb-5 lg:mb-0"
                    to={`/products/${products.id}`}
                  >
                    {/* img */}
                    <div className="relative w-[180px] h-[120px] overflow-hidden mr-3">
                      <img
                        className="absolute w-full h-full top-0 object-cover"
                        src={products.imageUrl}
                        alt=""
                      />
                    </div>
                    {/* title  */}
                    <div className="relative text-ms dark:text-white">
                      <h2 className="pr-7 group-hover:text-gray-700 font-bold text-base">
                        {products.title}
                      </h2>
                      {/* 價格 */}
                      <div className="lg:flex items-center mb-1">
                        <div className="text-gray-400 line-through mr-2">
                          原價 {products.origin_price}
                        </div>
                        <div>售價 {products.price}</div>
                      </div>
                      {/* 數量 */}
                      <div className="">購買數量 {products.quantity} 雙</div>
                    </div>
                  </Link>
                  {/* select */}
                  <div className="lg:absolute bottom-5 right-2 w-full lg:w-[150px] pb-4">
                    <div>
                      <h3 className="text-[0.8125rem] mb-1 dark:text-white">更改項目</h3>
                      <select
                        name=""
                        id=""
                        className="w-full border border-gray-200 rounded p-[6px] bg-white"
                        onChange={(e) =>
                          updateCartItem(e.target.value, products)
                        }
                        value={products.quantity}
                      >
                        {[...new Array(20)].map((_, item) => {
                          return (
                            <option key={item} value={item + 1}>
                              {item + 1}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div
                    className="deleteProduct absolute top-2 right-2 cursor-pointer dark:text-white"
                    onClick={() => dispatch(delectCart(products.id))}
                  >
                    X
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 flex flex-col lg:flex-row justify-end items-center dark:text-white">
            <div className="lg:w-[30%]">
              共計 <b className="text-[#3b3b3b] text-4xl dark:text-white">{totalQuantity}</b> 件
              <span className=" ml-2 text-red-600 font-bold text-2xl">
                $NT ${total}
              </span>
            </div>

            <Link
              to="/formdetail"
              onClick={() => dispatch(closeSindbar())}
              className="text-center mt-2 block w-full bg-black text-white p-3 rounded lg:w-40 transition duration-300 hover:bg-[#78b605] dark:bg-white dark:text-black"
            >
              下一步
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
