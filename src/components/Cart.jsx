import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSindbar } from "../slice/uiSlice";
import { delectCart } from "../slice/cartSlice";
export function Cart() {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state?.cart?.items)
  const totalQuantity = useSelector((state) => state?.cart?.totalQuantity)
  const totalMoney = useSelector((state) => state.cart.totalMoney);

  // 刪除產品
  const delectProduct = (id) => {
    dispatch(delectCart(id));
  };

  return (
    <div className=" p-5">
      <h2 className="mb-5 text-3xl font-bold">Cart</h2>
      <ul className="space-y-5 h-[calc(100vh-200px)] overflow-y-auto">
        {productDetail.map((products) => {
          return (
            <li key={products.id} className="group">
              <Link
                className="flex  group-hover:bg-[#d9f99d] transition duration-300 p-2"
                to={`/products/${products.id}`}
              >
                <div className="relative w-[100px] h-0 pb-[15.15%] overflow-hidden mr-3">
                  <img
                    className=" absolute w-full h-full top-0 object-cover"
                    src={products.imageUrl}
                    alt=""
                  />
                </div>
                <div className="relative text-[0.875rem] ">
                  <h2 className="pr-7 group-hover:text-gray-700">
                    {products.title}
                  </h2>
                  {/* 價格 */}
                  <div className="flex items-center mb-1">
                    <div className="text-gray-400 line-through mr-2">
                      {products.origin_price}
                    </div>
                    <div>${products.price}</div>
                  </div>
                  {/* 數量 */}
                  <div className="">購買數量 {products.quantity} 雙</div>
                  {/* 刪除 */}
                  <div
                    className="deleteProduct absolute top-1 right-0 cursor-pointer"
                    onClick={() => delectProduct(products.id)}
                  >
                    <FaTrash />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* 結帳 */}
      <div className="checkCat">
        共計 <b className="text-[#3b3b3b] text-4xl">{totalQuantity}</b> 件
        <span className=" ml-2 text-red-600 font-bold text-2xl">
          $NT ${totalMoney}
        </span>
        <Link
          to="/cartdetail"
          onClick={() => dispatch(closeSindbar())}
          className="text-center mt-2 block w-full bg-black text-white p-3 rounded transition duration-300 hover:bg-[#78b605]"
        >
          結帳
        </Link>
      </div>
    </div>
  );
}
