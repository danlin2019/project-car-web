import nike from "../../assets/n1-min.png";
import { Select } from "../../components/Select";

export function ShoeDetail() {
  return (
    <div className="flex flex-col lg:flex-row-reverse space-y-4 mt-5 dark:text-white">
      <div className="flex-1 lg:-mt-[9rem] lg:ml-28">
        <div className="flex-center h-full bg-gradient-to-br from-[#F637CF] from-5% via-[#E3D876] via-40% to-[#4DD4C6]">
          <img src={nike} className="animate-float" />
        </div>
      </div>
      <div className="flex-1 space-y-6">
        {/* Shoe text details */}
        <div className="text-5xl font-black md:text-9xl">Nike Air max 270</div>
        <div className="font-medium md:text-xl">
          {
            "The Nike Air Max 270 is a lifestyle shoe that's sure to turn heads with its vibrant color gradient."
          }
        </div>
      
        {/* Shoe buttons and links */}
        <div className="space-x-10">
          <button className="dark:bg-white dark:text-black isbutton h-14 w-44 bg-black text-white hover:bg-gray-900 active:bg-gray-700">
            Add to bag
          </button>
          <a
            href="#"
            className="text-lg font-bold underline underline-offset-4"
          >
            View details
          </a>
        </div>
      </div>
    </div>
  );
}
