import "./Sidebar.css"

const Sidebar = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <aside {...props}>
      <h2>Category</h2>
      <ul>
        <li>POS</li>
        <li>CRM</li>
      </ul>
    </aside>
  )
}

export default Sidebar