import CategoryMenuAccord from "../../molecules/accordion/CategoryMenuAccord"
import "./Sidebar.css"

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
  return (
    <div {...props}>
      
      <h2 className="category-menu-title">Categories</h2>
      <div className="category-menu-lists">
        <CategoryMenuAccord categoryName="POS" subCategoryLists={subCategory}/>
        <CategoryMenuAccord categoryName="CRM" subCategoryLists={subCategory}/>
      </div>
    </div>
  )
}

export default Sidebar