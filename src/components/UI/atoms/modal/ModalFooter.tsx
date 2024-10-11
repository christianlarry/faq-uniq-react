import "./ModalFooter.css" 

interface Props{
  children?:React.ReactNode
}

const ModalFooter = ({
  children
}:Props)=>{
  return (
    <div className="faqu-modal-footer">
      {children}
    </div>
  )
}

export default ModalFooter