import { TbShoppingBag } from "react-icons/tb";
import NikeLogo from "../assets/nike-logo.svg?react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
export function Nav({onClickOpen}) {
  const ROUTES = ["Home", "About", "Service", "Pricing", "Contact"];
  const [isMobileMenuShown, setiIsMobileMenuShown] = useState(false);
  return (
    <nav className="relative z-10 flex flex-wrap items-center justify-between dark:text-white">
      <a href="">
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
                className={`cursor-pointer rounded px-3 py-2 ${
                  i === 0
                    ? "bg-blue-500 text-white lg:bg-transparent lg:text-blue-500"
                    : "hover:bg-gray-100"
                } ${(i === 3 || i === 4) && "lg:text-white hover:bg-transparent hover:text-black"}`}
                key={route}
              >
                {route}
              </li>
            );
          })}
        </ul>
      </div>
      {/* Car button */}
      <div className="fixed bottom-4 left-4 lg:static dark:text-black" onClick={onClickOpen}>
        <div className="flex-center h-12 w-12 rounded-full bg-white shadow-md cursor-pointer">
          <TbShoppingBag />
        </div>
      </div>
    </nav>
  );
}
