import { Outlet } from "react-router-dom"
import Header from "../../UI/organisms/header/Header"

interface Props {
  children?: React.ReactNode
}

const MainLayout = ({
  children
}: Props) => {

  return (
    <div className="main-layout">
      <Header/>
      <div>
        <aside>
          <h2>Category</h2>
          <ul>
            <li>POS</li>
            <li>CRM</li>
          </ul>
        </aside>
        <main>
          {children || <Outlet/>}
        </main>
      </div>
    </div>
  )

}

export default MainLayout