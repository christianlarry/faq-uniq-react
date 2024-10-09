import CategoryMenuAccord from "../../molecules/accordion/CategoryMenuAccord"
import "./Sidebar.css"
import { getFaqCategory } from "../../../../api/api"
import FetchLoader from "../../atoms/loader/FetchLoader"
import FetchError from "../../atoms/error/ErrorText"


const Sidebar = (props: React.HTMLAttributes<HTMLElement>) => {

  const categoryResult = getFaqCategory()

  return (
    <div {...props}>
      
      <div className="section-title">
        <h2>Categories</h2>
      </div>

      {categoryResult.isLoading &&
        <FetchLoader message="Loading"/>
      }

      {categoryResult.data &&
        <div className="category-menu-lists">
          {categoryResult.data.data.map((category,idx)=>(
            <CategoryMenuAccord key={idx} category={category}/>
          ))}
        </div>
      }
      
      {categoryResult.error &&
        <FetchError/>
      }
    </div>
  )
}

export default Sidebar