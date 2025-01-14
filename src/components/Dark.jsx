import { useEffect } from "react";

import { BiMoon, BiSun } from "react-icons/bi";
export function Dark(){
  
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
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleDarkMode}
        className="bg-night-50 dark:text-night rounded-full px-4 py-2 text-white shadow-lg dark:bg-white"
      >
        <BiSun className="hidden dark:block" />
        <BiMoon className="block dark:hidden" />
      </button>
    </div>
  )

}