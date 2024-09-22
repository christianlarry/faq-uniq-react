interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children?:React.ReactElement
}

import "./IconButton.css"

const IconButton = ({children,className,...props}:Props)=>{
  return (
    <button className={`icon-btn${className?" "+className:""}`} {...props}>
      <i>
        {children}
      </i>
    </button>
  )
}

export default IconButton