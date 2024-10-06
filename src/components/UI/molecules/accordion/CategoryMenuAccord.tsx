import { useState } from "react"

import "./CategoryMenuAccord.css"
import GradientBox from "../../atoms/box/GradientBox"
import { FaChevronDown } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { FaqCategoryModel } from "../../../../interfaces/faqInterfaces"

interface Props{
  categoryName:string,
  subCategoryLists:FaqCategoryModel[]
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
            {subCategoryLists.map((sub,i)=>(
              <li key={i}>
                <Link to={`?category=${sub._id}`} className="sub-cat-lists-link" title={sub.name}>{sub.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GradientBox>
  )
}

export default CategoryMenuAccord