import GradientBox from "../../atoms/box/GradientBox"
import "./Sidebar.css"

const Sidebar = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div {...props}>
      
      <h2 className="category-menu-title">Categories</h2>
      <div className="category-menu-lists">
        <GradientBox>
          POS
        </GradientBox>
        <GradientBox>
          CRM
        </GradientBox>
      </div>
      
    </div>
  )
}

export default Sidebar