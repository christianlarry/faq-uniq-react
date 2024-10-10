import "./GradientBox.css"

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  gradient?:"y-t-r" | "r-t-y"
}

const GradientBox = ({
  children,
  className,
  gradient="r-t-y",
  ...props
}:Props)=>{
  return (
    <div className={`gradient-box ${gradient} ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

export default GradientBox