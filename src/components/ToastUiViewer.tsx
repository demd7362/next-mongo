'use client'
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

type ToastUiViewerProps = {
  content: string;
  style?: string;
};

export default function ToastUiViewer({ content, style }: ToastUiViewerProps) {
  return (
    <section className={style}>
      <Viewer initialValue={content} customHTMLRenderer={{
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
              {
                type: 'closeTag',
                tagName: 'iframe',
                outerNewLine: false
              }
            ]
          }
        }
      }} />
    </section>
  )
}
