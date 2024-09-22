import LogoUNIQ from "../../atoms/icon-logo/LogoUNIQ"
import FaqActionButton from "../../molecules/FaqHeaderAction"
import "./Header.css"

const Header = ()=>{



  return (
    <header className="page-header">
      <div className="container page-header-wrapper">
        <div className="page-header-action-wrap">
          <FaqActionButton/>
        </div>
        <h1 className="page-header-logo">
          <LogoUNIQ/>
        </h1>
        <div></div>
      </div>
    </header>
  )
}
  
export default Header