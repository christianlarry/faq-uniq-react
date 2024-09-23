import { Outlet } from "react-router-dom"
import Header from "../../UI/organisms/header/Header"

import "./MainLayout.css"
import { useEffect, useRef, useState } from "react"
import IconButton from "../../UI/atoms/button/IconButton"
import { FaChevronUp } from "react-icons/fa6"
import Sidebar from "../../UI/organisms/aside/Sidebar"
import FaqSearchBox from "../../UI/organisms/faq-search-box/FaqSearchBox"

interface Props {
  children?: React.ReactNode
}

const MainLayout = ({
  children
}: Props) => {

  // HEADER LOGIC
  const [isShowHeader, setIsShowHeader] = useState<boolean>(true)

  const pageHeaderSlideWrapRef = useRef<HTMLDivElement>(null)

  const pageHeaderSlideDown = () => {
    if (pageHeaderSlideWrapRef.current) {
      const pageHeaderSlideWrap = pageHeaderSlideWrapRef.current
      if (!isShowHeader) {
        const pageHeaderSlideWrapHeight = Number(pageHeaderSlideWrap.getBoundingClientRect().height.toFixed(1))

        pageHeaderSlideWrap.style.marginTop = `-${pageHeaderSlideWrapHeight - 10}px`
      } else {
        pageHeaderSlideWrap.style.marginTop = "0"
      }
    }
  }

  useEffect(() => {
    pageHeaderSlideDown()
  }, [isShowHeader])

  // useEffect(()=>{
  //   const handleWindowResize = ()=>{
  //     pageHeaderSlideDown()
  //   }

  //   window.addEventListener("resize",handleWindowResize)

  //   return ()=>{
  //     window.removeEventListener("resize",handleWindowResize)
  //   }
  // },[])


  return (
    <div className="main-layout">
      <section className="page-header-box">
        <div ref={pageHeaderSlideWrapRef} className="page-header-slide-wrap">
          <Header className={!isShowHeader ? "no-border" : undefined} />
        </div>

        <IconButton className={`slide-down-btn${!isShowHeader? " collapse":""}`} onClick={() => setIsShowHeader(!isShowHeader)}>
          <FaChevronUp />
        </IconButton>
      </section>

      <section>
        <FaqSearchBox/>
      </section>

      <section>
        <Sidebar/>
        <main>
          {children || <Outlet />}
        </main>
      </section>
    </div>
  )

}

export default MainLayout