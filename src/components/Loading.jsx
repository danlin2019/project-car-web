import loadingSvg from '../assets/loading.svg';


const Loading = ({ isLoading }) => {
  return (isLoading &&(
    <div className="fixed top-0 left-0 bg-[#0000006a] w-full h-full z-10 text-white flex justify-center items-center">
      <div className='text-center text-sm'>
        <span className='mb-2'>傳送中...</span>
        <img src={loadingSvg} className='w-12 m-auto' alt="loading" />
      </div>

    </div>
  )

  )
}

export default Loading;
