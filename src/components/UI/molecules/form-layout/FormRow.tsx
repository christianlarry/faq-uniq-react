import "./FormRow.css"

interface Props{
  children?:React.ReactNode
}

const FormRow = ({children}:Props)=>{
  return (
    <div className="form-row">
      {children}
    </div>
  )
}

export default FormRow