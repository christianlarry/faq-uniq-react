import Select, { GroupBase, Props, StylesConfig } from "react-select"

const bgColor = "rgba(33, 34, 35, 1)"
const txtColor = "rgba(217, 217, 217, 1)"

const customStyles:StylesConfig<any, boolean, GroupBase<any>> = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: bgColor,
    border: "none",
    boxShadow: "none",
    borderRadius: "10px",
    padding: "3.3px 4px"
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: bgColor,
    borderRadius: "10px"
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "rgba(44, 45, 46, 1)" : bgColor,
    color: txtColor,
    borderRadius: "10px"
  }),
  singleValue: (provided:any)=>({
    ...provided,
    color: txtColor
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: txtColor, // Warna chevron pada hover
    "&:hover": {
      color: "lightgray", // Warna chevron saat di-hover
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: txtColor, // Warna teks untuk pencarian di control
  }),
}

const CustomSelect = <OptionType, IsMulti extends boolean = false>(
  props: Props<OptionType, IsMulti>
) => {

  return (
    <Select {...props} styles={customStyles}/>
  )

}

export default CustomSelect