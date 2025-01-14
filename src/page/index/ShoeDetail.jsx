import nike from "../../assets/n1-min.png";
import { Link } from "react-router-dom";
export function ShoeDetail() {
  return (
    <div className="flex flex-col lg:flex-row-reverse space-y-4 mt-5 dark:text-white">
      <div className="flex-1 lg:-mt-[9rem] lg:ml-28">
        <div className="flex-center h-full bg-gradient-to-br from-[#F637CF] from-5% via-[#E3D876] via-40% to-[#4DD4C6]">
          <img src={nike} className="animate-float" />
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <div className="text-5xl font-black lg:text-[6.8rem] leading-[3.5rem] lg:leading-[9rem]">滿足你的鞋櫃，從這裡開始</div>
        <div className="font-medium md:text-xl">鞋履的藝術，走在舒適與風格的最前線。立即瀏覽新品鞋款，展現你的步履風采！</div>
        <div className="space-x-10">
          <Link to='/products' className="flex justify-center items-center dark:bg-white dark:text-black isbutton h-14 w-44 bg-black text-white hover:bg-gray-600 active:bg-gray-700">
            前往產品列表
          </Link>
        </div>
      </div>
    </div>
  );
}
