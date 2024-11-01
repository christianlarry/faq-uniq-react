import { Fragment, useEffect, useRef, useState } from "react";
import FaqAccordion from "../../UI/molecules/accordion/FaqAccordion";
import "./HomePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getFaq } from "../../../api/api";
import FetchLoader from "../../UI/atoms/loader/FetchLoader";
import ButtonText from "../../UI/atoms/button/ButtonText";
import ErrorText from "../../UI/atoms/error/ErrorText";
import { useAllFaq } from "../../../hooks/useAllFaq";
import { generateAccessToken } from '../../../utils/generateToken'; // Import fungsi generateAccessToken

const HomePage = () => {
  // HOOKS INIT
  const location = useLocation();
  const navigate = useNavigate();
  const allFaq = useAllFaq();

  // STATE
  const [faqApiQuery, setFaqApiQuery] = useState<string>("");
  const [isShowResetBtn, setIsShowResetBtn] = useState<boolean>(false);

  // REF
  const faqSectionRef = useRef<HTMLElement>(null);

  // SWR
  const faqResult = getFaq(faqApiQuery);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("sub_category");
    const search = searchParams.get("search");

    // SHOW/HIDE RESET BUTTON
    if (search || category || subCategory) {
      setIsShowResetBtn(true);
    } else {
      setIsShowResetBtn(false);
    }

    if (search) {
      setFaqApiQuery(`search=${search}`);
      return;
    }
    if (category) {
      setFaqApiQuery(`category=${category}`);
    } else if (subCategory) {
      setFaqApiQuery(`sub_category=${subCategory}`);
    } else {
      setFaqApiQuery("");
    }
  }, [location]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("sub_category");
    const search = searchParams.get("search");

    if (faqResult.data && (category || subCategory || search) && faqSectionRef.current) {
      faqSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [faqResult.data]);

  useEffect(() => {
    const generateAndMountWidget = async () => {
      // Hasilkan token akses
      const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoidXNlcl8xX2RldmVsb3BtZW50IiwibWV0YWRhdGEiOnsic2Vzc2lvbl9pZCI6IjQ2a2poZm5ibWwyN3NwOXJkNGpqbG9hbjJ0bnFqZmNtIiwidXNlcl9uYW1lIjoiVU5JUSBERVYiLCJhcGlfdG9rZW4iOiJCZWFyZXIgZXlKaGJHY2lPaUpJVXpJMU5pSXNJbXRwWkNJNkltUmxkaUo5LmV5SmtZWFJoSWpwN0luVnpaWElpT25zaVlXTmpiM1Z1ZEY5cFpDSTZJakVpTENKaWRYTnBibVZ6YzE5cFpDSTZJakVpTENKaWRYTnBibVZ6YzE5dVlXMWxJam9pSWl3aVpXMWhhV3dpT2lKaFpHMXBibWx6ZEhKaGRHOXlRSFZ1YVhFdVpHVjJJaXdpYm1GdFpTSTZJbFZPU1ZFZ1JFVldJaXdpY0dodmJtVWlPaUkyTWpnMU56UXlNalUzT0RnMklpd2lkWE5sY2w5cFpDSTZJakVpTENKMWMyVnlYM1I1Y0dVaU9pSmhaRzFwYmlKOUxDSjFjMlZ5WDNKdmJHVWlPbnNpYjNWMGJHVjBYMkZqWTJWemN5STZJakk1TERRd0xEUXhMRFF5TERRekxEUTBMRFExTERRMkxEUTNMRFV3TERnM0xEZzVMREV4TWl3ek5qUXNOVE0yTERVM01DdzFOemdzTlRjNUxEWXhNQ3cyTlRBc05qVXlMRFkxT0NKOWZTd2laWGh3SWpveE56TXdORFl3TlRBNExDSnBZWFFpT2pFM016QTBOREkxTURnc0ltcDBhU0k2SW1ZMllUTXlOalpsWVdRMU0yTTJNamhrWWpGaU1USTJNRFkwT0RVMFl6ZzFJaXdpYm1KbUlqb3hOek13TkRReU5UQTRmUS5UX3oxTzNIUi14MzBIQ2tMdEV4ZkU5eXI5Xy0weGpFN3Qyb3djMGw2ZF8wIiwiZW52IjoiZGV2ZWxvcG1lbnQifSwiZXhwIjoxNzMwNDUzMzA4fQ.zGPxtDSw1mzlrcUbd9G_yEp9MyqdRoG8WUVdnUbt8xQ" //await generateAccessToken("user-1", { name: "John Doe" });
      console.log("Generated Access Token:", accessToken); // Log token untuk verifikasi

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

  // EVENT HANDLER
  const handleResetFaq = () => {
    navigate("/");
  };

  return (
    <>
      <section id="faq" ref={faqSectionRef}>
        <div className="section-title faq-section-title">
          <h2>Questions</h2>
          <span>
            ({faqResult.data ? faqResult.data.data.length : ""} of{" "}
            {allFaq.faq ? allFaq.faq.length : ""})
          </span>
          {isShowResetBtn && (
            <ButtonText text="Reset" style={{ marginLeft: "5px" }} onClick={handleResetFaq} />
          )}
        </div>
        <div className="faq-question-lists">
          {faqResult.isLoading && <FetchLoader message="Loading" />}

          {faqResult.data &&
            faqResult.data.data.map((faq, i) => (
              <Fragment key={i}>
                {faq !== null && (
                  <FaqAccordion
                    title={faq.title}
                    answer={faq.answer}
                    _id={faq._id}
                    htmlAnswer={faq.htmlAnswer}
                  />
                )}
              </Fragment>
            ))}

          {faqResult.data && faqResult.data.data.length === 0 && (
            <ErrorText message="Ups, Faq not found:(" />
          )}

          {faqResult.error && <ErrorText />}
        </div>
      </section>
    </>
  );
};

export default HomePage;
