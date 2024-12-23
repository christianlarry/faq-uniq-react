import { Outlet } from "react-router-dom"
import Header from "../../UI/organisms/header/Header"

import "./MainLayout.css"
import { useEffect, useRef, useState } from "react"
import IconButton from "../../UI/atoms/button/IconButton"
import { FaChevronUp } from "react-icons/fa6"
import Sidebar from "../../UI/organisms/aside/Sidebar"
import FaqSearchBox from "../../UI/organisms/faq-search-box/FaqSearchBox"
import { AuthProvider } from "../../../hooks/useAuth"
import { AllFaqProvider } from "../../../hooks/useAllFaq"
import { FaqCategoryProvider } from "../../../hooks/useFaqCategory"

import {ErrorBoundary} from "react-error-boundary"
import ISErrorScreen from "../../UI/organisms/error/ISErrorScreen"
import { postGenerateChainlitToken } from "../../../api/api"

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

  // ALL FAQ DATA
  


  useEffect(() => {
    const generateAndMountWidget = async () => {

      const result = await postGenerateChainlitToken()
      
      if(result.status !== 200){
        console.log("Failed generate chainlit token!")
        return
      }

      if(!result.data.data.token){
        console.log("Token not found!")
        return
      }

      // Hasilkan token akses
      const accessToken = result.data.data.token;

      const script = document.createElement("script");
      script.src = `${import.meta.env.VITE_COPILOT_SERVER}/copilot/index.js`;
      script.async = true;
      script.onload = () => {
        window.mountChainlitWidget({
          chainlitServer: import.meta.env.VITE_COPILOT_SERVER,
          accessToken: accessToken, // Gunakan token yang dihasilkan
          theme: "dark",
          button: {
            style: {
              bgcolor: "#494949",
              color: "#fff",
              bgcolorHover: "#FD9E28",
              boxShadow: "#f0f0f0",
              size: "45px",
            },
          },
        });
      };
      document.body.appendChild(script);
    };

    generateAndMountWidget();
  }, []);

  return (
    <ErrorBoundary fallback={<ISErrorScreen/>}>
      <FaqCategoryProvider>
        <AllFaqProvider>
          <AuthProvider>
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
                <div className="container">
                  <FaqSearchBox/>
                </div>
              </section>

              {/* ASIDE MAIN SECTION */}
              <section>
                <div className="container">
                  <div className="sidebar-main-container">
                    <aside className="sidebar-container">
                      <Sidebar/>
                    </aside>
                    <main className="main-container">
                      {children || <Outlet />}
                    </main>
                  </div>
                </div>
              </section>

            </div>
          </AuthProvider>
        </AllFaqProvider>
      </FaqCategoryProvider>
    </ErrorBoundary>
  )

}

export default MainLayout