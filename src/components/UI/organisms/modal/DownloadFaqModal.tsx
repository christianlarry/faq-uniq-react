import { useState } from "react"
import Button from "../../atoms/button/Button"
import Select from "../../atoms/input/Select"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import { useAllFaq } from "../../../../hooks/useAllFaq"
import { downloadFile } from "../../../../utils/fileManager"

interface Props{
  showModalState: [boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const fileTypeData = [
  {
    key:"TXT",
    value:"txt"
  }
]

const DownloadFaqModal = ({
  showModalState
}:Props)=>{

  // HOOKS
  const allFaq = useAllFaq()
  const faqs = allFaq.faq

  // STATE
  const [show,setShow] = showModalState
  const [fileType,setFileType] = useState<string>()

  const handleCancelClick = ()=>{
    setShow(false)
  }

  const generateTxtFaqs = () => {
    if(faqs){
      const txtContent = faqs
        .map((faq) => `Q: ${faq.title}\nA: ${faq.answer}\n`)
        .join("\n");

      downloadFile(txtContent, "faqs.txt", "text/plain");
    }
  };

  const handleDownloadClick = ()=>{
    if(fileType){
      switch(fileType){
        case "txt":
          generateTxtFaqs()
          break

        default:
          console.error("Invalid file type")
          break
      }
    }
  }

  if(show) return (
    <Modal size="sm">
      <ModalContent>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          <span>Download FAQs as</span>
          <Select options={fileTypeData} state={[fileType,setFileType]}/>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          {fileType &&
          <Button onClick={handleDownloadClick}>
            <span>Download</span>
          </Button>
          }
        </div>
      </ModalFooter>
    </Modal>
  )

  return <></>
}

export default DownloadFaqModal