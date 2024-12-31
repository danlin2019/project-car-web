export function Card({item}){
  
  return (
    <div className={`${item.className} max-w-xl cursor-pointer transition hover:scale-105 relative`}>
      <div className="p-8">
        <div className="text-2xl font-bold">{item.title}</div>
        <div className="mt-10 font-semibold underline underline-offset-4">
          SHOP NOW +
        </div>
      </div>
      <img src={item.src} className=" absolute right-[0%] top-5 h-40 w-56"/>
    </div>
  )
}