import "./GradientBox.css"

interface Props extends React.HTMLAttributes<HTMLDivElement>{

}

const GradientBox = ({
  children,
  className,
  ...props
}:Props)=>{
  return (
    <div className={`gradient-box ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

export default GradientBox