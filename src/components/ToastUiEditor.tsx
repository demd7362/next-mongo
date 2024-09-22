import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/toastui-editor.css'
import { uploadFile } from '@/app/actions'
import { useInputModal } from '@/store/modalStore'
import { useEffect } from 'react'

type Props = {
  editorRef: React.RefObject<Editor> | null;
  // imageHandler: (blob: File, callback: typeof Function) => void;
  content?: string;
};

// 유튜브 삽입을 위한 커스텀 툴바 아이템 생성
const icon = document.createElement('img')
icon.setAttribute('src', '/youtube_logo.png')
icon.setAttribute('width', '35')
icon.setAttribute('class', 'cursor-pointer')


export default function ToastUiEditor({ content, editorRef }: Props) {
  const { setCallback, openModal } = useInputModal()


  useEffect(() => {
    const handleClickYoutube = () => {
      openModal('Youtube URL')
      setCallback((state) => {
        const url = state?.content
        if(!url) {
          return
        }
        if ((/https:\/\/youtu.be\/.{11,}/).test(url)
          || (/https:\/\/www.youtube.com\/watch\?v=.{11,}/).test(url)) {

          const html = '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/'
            + url.slice(-11)
            + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

          // 마크다운 모드에서 iframe 태그 삽입 후, 팝업을 닫고 위지윅 모드로 변환
          const instance = editorRef?.current?.getInstance()
          instance.changeMode('markdown')
          instance.insertText(html)
          // instance.setHTML(instance.getHTML() + html)
          instance.changeMode('wysiwyg')
        }
      })
    }

    icon.addEventListener('click', handleClickYoutube)
    return () => {
      icon.removeEventListener('click', handleClickYoutube)
    }
  }, [])

  const addImageBlobHook = async (file: File, callback: Function) => {
    const formData = new FormData()
    formData.append('file', file)
    const uploadPath = await uploadFile(formData)
    const instance = editorRef?.current?.getInstance()
    instance.setHTML(instance?.getHTML() + `<img src="${uploadPath}" alt=""/>`)
    // 이미지 업로드창 닫기
    instance.eventEmitter.emit('closePopup')
  }
  return (
    <Editor initialValue={content ?? ' '} initialEditType="wysiwyg" autofocus={false} ref={editorRef} toolbarItems={[
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task'],
      ['table', 'image', 'link'],
      ['code', 'codeblock'],
      // 유튜브 삽입을 위해 툴바 버튼 커스터마이징
      [{
        name: 'Youtube',
        tooltip: 'Youtube',
        el: icon
      }]
    ]} hideModeSwitch={false} height="500px" language="ko-KR" hooks={{ addImageBlobHook }} customHTMLRenderer={{
      htmlBlock: {
        iframe(node: any) {
          return [
            {
              type: 'openTag',
              tagName: 'iframe',
              outerNewLine: true,
              attributes: node.attrs
            },
            { type: 'html', content: node.childrenHTML },
            { type: 'closeTag', tagName: 'iframe', outerNewLine: true }
          ]
        }
      }
    }} />
  )
}
