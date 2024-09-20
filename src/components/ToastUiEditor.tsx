import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/toastui-editor.css';
import { uploadFile } from '@/app/actions'
import { useEffect } from 'react'
type Props = {
  editorRef: React.RefObject<Editor> | null;
  // imageHandler: (blob: File, callback: typeof Function) => void;
  content?: string;
};

const toolbar = [['heading', 'bold', 'italic', 'strike'], ['hr', 'quote', 'ul', 'ol'], ['image']];

export default function ToastUiEditor({ content, editorRef }: Props) {
  const addImageBlobHook = async (file:File, callback: Function) => {
    const formData = new FormData()
    formData.append('file', file)
    const uploadPath = await uploadFile(formData)
    const instance = editorRef?.current?.getInstance()
    instance?.setHTML(instance?.getHTML() + `<img src="${uploadPath}" alt=""/>`)
    // 이미지 업로드창 닫기
    instance?.eventEmitter.emit('closePopup')
  }
  return (
    <Editor
      initialValue={content ?? ' '}
      initialEditType='wysiwyg'
      autofocus={false}
      ref={editorRef}
      toolbarItems={toolbar}
      hideModeSwitch={false}
      height='500px'
      hooks={{ addImageBlobHook }}
    />
  );
}
