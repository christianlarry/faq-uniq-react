import { Fragment, useEffect, useState } from "react"

import "./CategoryMenuAccord.css"
import GradientBox from "../../atoms/box/GradientBox"
import { FaChevronDown } from "react-icons/fa6"
import { Link, useLocation } from "react-router-dom"
import { FaqCategoryModel } from "../../../../interfaces/faqInterfaces"

interface Props{
  category:FaqCategoryModel
}

const CategoryMenuAccord = ({category}:Props) => {

  const [isShow,setIsShow] = useState<boolean>(false)
  const [subCategoryQuery,setSubCategoryQuery] = useState<string>()

  const handleAccordionLabelClick = ()=>{
    setIsShow(!isShow)
  }

  // LOCATION GET CATEGORY PARAMS
  const location = useLocation()
  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search)
    const categoryParam = queryParams.get("category")
    const subCategoryParam = queryParams.get("sub_category")

    if(subCategoryParam){
      setSubCategoryQuery(subCategoryParam)

    }else{
      setSubCategoryQuery(undefined)
    }

    if(categoryParam && categoryParam == category._id){
      setIsShow(true)
    }else{
      const isSubCatInThisCategory = category.sub_category.filter(val => {
        if(val != null) {
          return val._id === subCategoryParam
        }
        return false
      })

      if(isSubCatInThisCategory.length > 0) return setIsShow(true)
      setIsShow(false)
    }
  },[location])

  return (
    <GradientBox>
      <div className={`cat-accordion${isShow?" show":""}`}>
        <label className="cat-accordion-label">
          <Link to={`faq?category=${category._id}`} className="cat-label-link">{category.name}</Link>
          <i className="cat-accordion-chevron" onClick={handleAccordionLabelClick}>
            <FaChevronDown/>
          </i>
        </label>
        <div className="cat-accordion-content">
          <ul className="sub-cat-lists">
            {category.sub_category.map((sub,i)=>(
              <Fragment key={i}>
                {sub != null && (
                  <li key={i}>
                    <Link to={`faq?sub_category=${sub._id}`} className={`sub-cat-lists-link ${sub._id == subCategoryQuery?"active":""}`} title={sub.sub_category}>{sub.sub_category}</Link>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </GradientBox>
  )
}

export default CategoryMenuAccord