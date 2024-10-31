import { createPortal } from "react-dom"
import "./LoadingScreen.css"
import FetchLoader from "../../atoms/loader/FetchLoader"

const LoadingScreen = ()=>{
  return (
    <>
      {createPortal((
        <div className="loading-screen">
          <FetchLoader message="Loading"/>
        </div>
      ),document.body)}
    </>
  )
}

export default LoadingScreen