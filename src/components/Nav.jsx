import { TbShoppingBag } from "react-icons/tb";
import NikeLogo from "../assets/nike-logo.svg?react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { openSindbar } from "../slice/uiSlice";
import { useDispatch } from "react-redux";
export function Nav() {

  const dispatch = useDispatch()

  const totalQuantity = useSelector((state => state.cart))
  const ROUTES = [
    {
      name:'Home',
      links: '',
    },
    // {
    //   name:'About',
    //   links: 'About',
    // },
    {
      name:'產品列表',
      links: 'Products',
    },
  ];
  const [isMobileMenuShown, setiIsMobileMenuShown] = useState(false);
  return (
    <nav className="sticky z-10 flex flex-wrap items-center justify-between dark:text-white">
      <a href="">
        {/* 購物前台 */}
        <NikeLogo className="h-20 w-20" />
      </a>
      <button
        onClick={() => setiIsMobileMenuShown(!isMobileMenuShown)}
        className="lg:hidden rounded-lg p-2 hover:bg-gray-100 focus:bg-gray-50"
      >
        <RxHamburgerMenu size={25} />
      </button>
      {/* Menu */}
      <div
        className={`${!isMobileMenuShown && "hidden"} w-full lg:block lg:w-auto`}
      >
        <ul className="lg:space-x-8 flex flex-col lg:flex-row rounded-lg border border-gray-100 lg: border-none lg:bg-transparent bg-gray-50 p-4 text-1">
          {ROUTES.map((route, i) => {
            return (
              <li
                className={`rounded px-3 py-2 lg:text-black hover:bg-transparent hover:text-black`}
                key={route.name}
              >
                <Link to={`/${route.links}`}>{route.name}</Link>
               
              </li>
            );
          })}
        </ul>
      </div>
      {/* Car button */}
      <div className="fixed bottom-4 left-4 lg:static dark:text-black" onClick={()=>dispatch(openSindbar())}>
        <div className="relative">
          <div className="buy-num">{totalQuantity.items.length}</div>
          <div className="flex-center h-12 w-12 rounded-full bg-white shadow-md cursor-pointer">
            <TbShoppingBag />
          </div>
        </div>

      </div>
    </nav>
  );
}
