import { useEffect, useState } from "react"
import CategoryMenuAccord from "../../molecules/accordion/CategoryMenuAccord"
import "./Sidebar.css"
import { FaqCategoryModel } from "../../../../interfaces/faqInterfaces"
import axios from "axios"

// DUMMY DATA - FEEL FREE TO DELETE
const subCategory = [
  {
    name: "Pembayaran Layanan",
    url:"/"
  },
  {
    name: "Apakah blabla",
    url:"/"
  },
  {
    name: "Pembayaran pelanggan",
    url:"/"
  },
]
// DELETE UNTIL THIS LINE

const Sidebar = (props: React.HTMLAttributes<HTMLElement>) => {

  const [category,setCategory] = useState<FaqCategoryModel[]>()

  const getCategory = async ()=>{
    const result = await axios.get("http://localhost:3000/api/v1/faq-category")
    const data = result.data

    setCategory(data.data)
  }

  useEffect(()=>{
    getCategory()
  },[])

  return (
    <div {...props}>
      
      <h2 className="category-menu-title">Categories</h2>
      <div className="category-menu-lists">
        {category &&
        <CategoryMenuAccord categoryName="POS & CRM" subCategoryLists={category}/>
        }
      </div>
    </div>
  )
}

export default Sidebar