import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import "./TextEditor.css"

interface Props{
  dataState:[string,React.Dispatch<React.SetStateAction<string>>]
}

const TextEditor = ({dataState}:Props)=>{

  const [editorData, setEditorData] = dataState

  return (
    <div className='text-editor'>
      <CKEditor
        editor={ ClassicEditor }
        config={ {
          toolbar: [
            'undo', 'redo', '|',
            'heading', '|', 'bold', 'italic', '|',
            'link', 'insertTable', 'mediaEmbed', '|',
            'bulletedList', 'numberedList', 'indent', 'outdent'
          ],
          plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Table,
            Undo
          ],
          initialData: "",
        } }
        data={editorData}
        onChange={(_e,editor)=>{
          const data = editor.getData()
          setEditorData(data)
        }}
      />
    </div>
  )
}

export default TextEditor