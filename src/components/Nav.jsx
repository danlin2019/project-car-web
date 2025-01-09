import { TbShoppingBag } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link ,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { openSindbar } from "../slice/uiSlice";
import { useDispatch } from "react-redux";
export function Nav() {

  const dispatch = useDispatch()
  const location = useLocation()
  const totalQuantity = useSelector((state => state.cart))
  const ROUTES = [
    {
      name:'Home',
      links: '',
      path: "/",
    },
    {
      name:'products',
      links: 'products',
      path: "/products",
    },
  ];
  const [isMobileMenuShown, setiIsMobileMenuShown] = useState(false);
  return (
    <nav className="relative z-10 flex flex-wrap items-center justify-between dark:text-white">
      <Link to="/">
        {/* 購物前台 */}
        <div className="flex-center h-10 w-10 rounded-[99em] bg-black text-white text-xl">
            K
        </div>
      </Link>
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
        <ul className="nav">
          {ROUTES.map((route, i) => {
            const isActive =  route.path === "/"
            ? location.pathname === route.path // Home 僅在路徑完全等於 "/" 時高亮
            : location.pathname.startsWith(route.path); // Products 在其路徑和子路徑時高亮
            return (
              <li
                className={`rounded px-3 py-2 hover:bg-transparent hover:text-black`}
                key={route.name}
              >
                <Link to={`/${route.links}`} className={`${isActive ? 'text-[#78b605]' : 'text-black' }`}>{route.name}</Link>
               
              </li>
            );
          })}
        </ul>
      </div>
      {/* Car button */}
      {!['/cartdetail','/formDetail'].includes(location.pathname) && (
        <div className={`fixed bottom-4 left-4 lg:static dark:text-black`} onClick={()=>dispatch(openSindbar())}>
          <div className="relative">
            <div className="buy-num">{totalQuantity.items.length}</div>
            <div className="flex-center h-12 w-12 rounded-full bg-white shadow-md cursor-pointer">
              <TbShoppingBag />
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}
