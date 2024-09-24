import { useState } from "react"

import "./CategoryMenuAccord.css"
import GradientBox from "../../atoms/box/GradientBox"
import { FaChevronDown } from "react-icons/fa6"
import { Link } from "react-router-dom"


interface SubCategoryListInterface{
  name:string,
  url:string
}

interface Props{
  categoryName:string,
  subCategoryLists:SubCategoryListInterface[]
}

const CategoryMenuAccord = ({categoryName,subCategoryLists}:Props) => {

  const [isShow,setIsShow] = useState<boolean>(false)

  const handleAccordionLabelClick = ()=>{
    setIsShow(!isShow)
  }

  return (
    <GradientBox>
      <div className={`cat-accordion${isShow?" show":""}`}>
        <label className="cat-accordion-label">
          <Link to="/" className="cat-label-link">{categoryName}</Link>
          <i className="cat-accordion-chevron" onClick={handleAccordionLabelClick}>
            <FaChevronDown/>
          </i>
        </label>
        <div className="cat-accordion-content">
          <ul className="sub-cat-lists">
            {subCategoryLists.map(sub=>(
              <li key={sub.name}>
                <Link to={sub.url} className="sub-cat-lists-link">{sub.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GradientBox>
  )
}

export default CategoryMenuAccord