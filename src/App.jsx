import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { NewArrivalsSection } from "./page/index/NewArrivalsSection";
import { ShoeDetail } from "./page/index/ShoeDetail";
import { Sliderbar } from "./components/Sliderbar";
import { SHOE_LIST } from "./constant";
import { Cart } from "./components/Cart";
import { BiMoon, BiSun } from "react-icons/bi";
const FAKE_CART_ITEMS = SHOE_LIST.map((shoe) => {
  return {
    product: shoe,
    qty: 1,
    size: 44,
  };
});

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
useEffect(() => {
  const isDarkMode = localStorage.getItem("isDarkMode") === "true";
  if (isDarkMode) {
    window.document.documentElement.classList.add("dark");
  }
}, []);

  const toggleDarkMode = () => {
    window.document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "isDarkMode",
      window.document.documentElement.classList.contains("dark")
    );
  };
  return (
    <div className="dark:bg-night animate-fadeIn p-10 xl:px-24">
      <Nav onClickOpen={() => setIsSidebarOpen(true)} />
      <ShoeDetail />
      <NewArrivalsSection items={SHOE_LIST} />
      <Sliderbar
        isOpen={isSidebarOpen}
        onClickClose={() => setIsSidebarOpen(false)}
      >
        <Cart cartItems={FAKE_CART_ITEMS} />
      </Sliderbar>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="bg-night-50 dark:text-night rounded-full px-4 py-2 text-white shadow-lg dark:bg-white"
        >
          <BiSun className="hidden dark:block" />
          <BiMoon className="block dark:hidden" />
        </button>
      </div>
    </div>
  );
}
