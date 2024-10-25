import { FaChevronDown } from "react-icons/fa6"
import "./Select.css"

export interface Options{
  key:string,
  value:string
}

export interface OptionsWithGroup{
  label:string,
  options:Options[]
}

interface Props{
  options?:Options[],
  optionsWithGroup?:OptionsWithGroup[]
  state:[string|undefined,React.Dispatch<React.SetStateAction<string|undefined>>]
}

const Select = ({
  options,
  optionsWithGroup,
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
        {optionsWithGroup && optionsWithGroup.map((optGroup,i)=>(
          <optgroup key={i} label={optGroup.label}>
            {optGroup.options.map(opt=>(
              <option key={opt.key} value={opt.value}>{opt.key}</option>  
            ))}
          </optgroup>
        ))}

        {(options && !optionsWithGroup) && 
          options.map(opt=>(
            <option key={opt.key} value={opt.value}>{opt.key}</option>
          )
        )}
      </select>
      <i className="input-select-chevron"><FaChevronDown/></i>
    </div>
  )
}

export default Select