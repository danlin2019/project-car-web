import { SlArrowDown } from "react-icons/sl"; 
export function Select({title,options}){
  return(<div className=" relative dark:text-black">
    <select
     defaultValue={""}
     className="w-24 appearance-none border border-gray-300 bg-white p-4 "
    >
      <option value="" disabled hidden>
        {title}
      </option>
      {options.map((option)=>{
        return <option value={option} key={option}>{option}</option>
      })}
      
    </select>
    <div className="flex-center absolute inset-y-0 right-0 pr-3">
      <SlArrowDown />
    </div>

  </div>)
}


