import { useEffect, useState } from "react"

import "./CategoryMenuAccord.css"
import GradientBox from "../../atoms/box/GradientBox"
import { FaChevronDown } from "react-icons/fa6"
import { Link, useLocation } from "react-router-dom"
import { FaqCategoryModel } from "../../../../interfaces/faqInterfaces"

interface Props{
  categoryName:string,
  subCategoryLists:FaqCategoryModel[]
}

const CategoryMenuAccord = ({categoryName,subCategoryLists}:Props) => {

  const [isShow,setIsShow] = useState<boolean>(false)
  const [categoryQuery,setCategoryQuery] = useState<string>()

  const handleAccordionLabelClick = ()=>{
    setIsShow(!isShow)
  }

  // LOCATION GET CATEGORY PARAMS
  const location = useLocation()
  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search)
    const category = queryParams.get("category")

    if(category){
      setIsShow(true)
      setCategoryQuery(category)
    }else{
      setIsShow(false)
      setCategoryQuery(undefined)
    }
  },[location])

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
                <Link to={`?category=${sub._id}`} className={`sub-cat-lists-link ${sub._id == categoryQuery?"active":""}`} title={sub.name}>{sub.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GradientBox>
  )
}

export default CategoryMenuAccord