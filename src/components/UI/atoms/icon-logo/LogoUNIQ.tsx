import { Link } from "react-router-dom"
import logoUNIQ from "../../../../assets/images/logo/logo-uniq-white.png"

import "./LogoUNIQ.css"

const LogoUNIQ = (props:React.ImgHTMLAttributes<HTMLImageElement>)=>{

  return(
    <Link to="/" aria-label="Home Page" className="logo-uniq-a">
      <img src={logoUNIQ} alt="Logo UNIQ" {...props}/>
    </Link>
  )
}

export default LogoUNIQ