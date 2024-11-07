import "./FormColumn.css"

interface Props{
  children?:React.ReactNode
  size?:number
}

const FormColumn = ({children,size=1}:Props)=>{
  return (
    <div className="form-column" style={{flex: size}}>
      {children}
    </div>
  )
}

export default FormColumn