import { useEffect, useState } from "react"
import { getFaq } from "../../services/api"
import { FaqModel } from "../../interfaces/faqInterfaces"

import "./HomePage.css"
import LogoUNIQ from "../UI/atoms/LogoUNIQ"

const HomePage = ()=>{

  const [faq,setFaq] = useState<FaqModel[]>()

  useEffect(()=>{

    getFaq().then(val=>{
      setFaq(val.data)
    })

  },[])

  return (
    <div>
      <h1>Home Page</h1>
      <LogoUNIQ width={20}/>
      <ul>  
        {faq && faq.map((val,i)=>(
        <li key={i}>{val.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage