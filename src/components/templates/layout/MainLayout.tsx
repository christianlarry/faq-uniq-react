import { Outlet } from "react-router-dom"
import Header from "../../UI/organisms/header/Header"

import "./MainLayout.css"
import { useState } from "react"

interface Props {
  children?: React.ReactNode
}

const MainLayout = ({
  children
}: Props) => {

  const [isShowHeader,setIsShowHeader] = useState<boolean>(false)

  return (
    <div className="main-layout">
      <div className={`page-header-box ${isShowHeader?"show":""}`}>
        <div className="page-header-slide-wrap">
          <Header className={!isShowHeader?"no-border":undefined}/>
        </div>
      </div>
      <div>
        <aside>
          <h2>Category</h2>
          <ul>
            <li>POS</li>
            <li>CRM</li>
          </ul>
          <button onClick={()=>setIsShowHeader(!isShowHeader)}>TEST BTN</button>
        </aside>
        <main>
          {children || <Outlet/>}
        </main>
      </div>
    </div>
  )

}

export default MainLayout