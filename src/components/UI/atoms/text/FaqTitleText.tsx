import "./FaqTitleText.css"

const FaqTitleText = ({
  className,
  ...props
}:React.HTMLAttributes<HTMLHeadingElement >)=>{
  return (
    <h1 className={`faq-title-text ${className||""}`} {...props}>Frequently Asked Questions<span>|</span></h1>
  )
}

export default FaqTitleText