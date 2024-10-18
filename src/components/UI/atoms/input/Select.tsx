import { FaChevronDown } from "react-icons/fa6"
import "./Select.css"

interface Options{
  key:string,
  value:string
}

interface Props{
  options:Options[],
  state:[string|undefined,React.Dispatch<React.SetStateAction<string|undefined>>]
}

const Select = ({
  options,
  state
}:Props)=>{

  const [selected,setSelected] = state

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    const value = e.target.value
  
    setSelected(value)
  }

  return(
    <div className="input-select-wrapper">
      <select value={selected} className="input-select" onChange={handleChange}>
        <option></option>
        {options.map(opt=>(
        <option key={opt.key} value={opt.value}>{opt.key}</option>
        ))}
      </select>
      <i className="input-select-chevron"><FaChevronDown/></i>
    </div>
  )
}

export default Select