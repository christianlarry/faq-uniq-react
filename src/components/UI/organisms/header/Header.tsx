import LogoUNIQ from "../../atoms/icon-logo/LogoUNIQ"
import FaqActionButton from "../../molecules/FaqHeaderAction"
import "./Header.css"

const Header = ({
  className,
  ...props
}:React.HTMLAttributes<HTMLElement>)=>{
  
  return (
    <header className={`page-header${className ? " "+className:""}`} {...props}>
      <div className="container">
        <div className="page-header-wrapper">
          <div className="page-header-action-wrap">
            <FaqActionButton/>
          </div>
          <h1 className="page-header-logo">
            <LogoUNIQ/>
          </h1>
          <div></div>
        </div>
      </div>
    </header>
  )
}
  
export default Header