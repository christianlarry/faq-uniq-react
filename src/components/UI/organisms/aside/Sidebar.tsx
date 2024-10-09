import CategoryMenuAccord from "../../molecules/accordion/CategoryMenuAccord"
import "./Sidebar.css"
import { getFaqCategory } from "../../../../api/api"
import { useEffect } from "react"


const Sidebar = (props: React.HTMLAttributes<HTMLElement>) => {

  const categoryResult = getFaqCategory()

  return (
    <div {...props}>
      
      <h2 className="category-menu-title">Categories</h2>
      {categoryResult.data &&
        <div className="category-menu-lists">
          {categoryResult.data.data.map((category,idx)=>(
            <CategoryMenuAccord key={idx} category={category}/>
          ))}
        </div>
      }
      
      {categoryResult.error &&
        <h2>Some error happen berodih</h2>
      }
    </div>
  )
}

export default Sidebar