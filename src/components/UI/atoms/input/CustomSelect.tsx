import Select, { Props, StylesConfig } from "react-select"

const customStyles:StylesConfig = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(33, 34, 35, 1)", // Warna background untuk control utama
    color: "white", // Atur warna teks jika diperlukan
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(33, 34, 35, 1)", // Warna background untuk menu dropdown
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "rgba(44, 45, 46, 1)" : "rgba(33, 34, 35, 1)", // Warna opsi saat di-hover
    color: "white", // Warna teks opsi
  }),
}

const CustomSelect = ({
  ...props
}: Props) => {

  return (
    <Select {...props} styles={customStyles}/>
  )

}

export default CustomSelect