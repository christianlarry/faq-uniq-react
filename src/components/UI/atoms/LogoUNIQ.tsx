import { Link } from "react-router-dom"
import logoUNIQ from "../../../assets/images/logo/logo-uniq-white.png"

const LogoUNIQ = (props:React.ImgHTMLAttributes<HTMLImageElement>)=>{

  return(
    <Link to="/" aria-label="Home Page">
      <img src={logoUNIQ} alt="Logo UNIQ" {...props}/>
    </Link>
  )
}

export default LogoUNIQ