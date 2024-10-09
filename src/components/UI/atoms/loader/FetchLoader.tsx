import './FetchLoader.css'
import Lottie from "lottie-react"

import infinityLoaderAnimation from "../../../../assets/json/loader/infinity-loader.json"

const FetchLoader = ({message}:{message?:string}) => { 
  return (
  <div className='data-loader'>
    <Lottie className='data-loader-gif' animationData={infinityLoaderAnimation} loop/>
    {message && <span className='data-loader-message'>{message}</span>}

  </div>
  )
}

export default FetchLoader