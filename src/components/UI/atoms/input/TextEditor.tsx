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
  Undo,
  EventInfo,
  Editor
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import "./TextEditor.css"

interface Props{
  data:string|undefined|null
  onChange?:(event: EventInfo, editor: Editor) => void
  onBlur?:(event: EventInfo, editor: Editor) => void
}

const TextEditor = ({
data,
onChange,
onBlur
}:Props)=>{

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
          mediaEmbed:{
            previewsInData: true
          },
          initialData: "",
        } }
        data={data}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default TextEditor