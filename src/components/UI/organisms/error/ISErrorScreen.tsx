import ErrorText from "../../atoms/error/ErrorText"

import "./ErrorScreen.css"

const ISErrorScreen = ()=>{
  return (
    <div className="error-screen-container">
      <div style={{display: "flex",flexDirection: "column", alignItems: "center", gap: "5px"}}>
        <ErrorText message="500 | Internal Server Error"/>
        <p>It's not you, it's me :(</p>
      </div>
    </div>
  )
}

export default ISErrorScreen