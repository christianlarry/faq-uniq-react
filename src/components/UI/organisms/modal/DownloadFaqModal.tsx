import { useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import { useAllFaq } from "../../../../hooks/useAllFaq"
import { downloadFile } from "../../../../utils/fileManager"
import CustomSelect from "../../atoms/input/CustomSelect"

interface Props{
  onClose:()=>void
}

const options = [
  {
    label: "TXT",
    value: "txt"
  }
]

const DownloadFaqModal = ({
  onClose
}:Props)=>{

  // HOOKS
  const allFaq = useAllFaq()
  const faqs = allFaq.faq

  // STATE
  const [fileType,setFileType] = useState<string>()

  const handleCancelClick = ()=>{
    onClose()
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

  return (
    <Modal size="sm" onClose={onClose}>
      <ModalContent>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          <span>Download FAQs as</span>
          <CustomSelect
            options={options}
            placeholder="Select format file..."
            autoFocus={false}
            onChange={(val)=>setFileType(val?val.value:undefined)}
          />
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
}

export default DownloadFaqModal