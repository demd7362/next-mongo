'use client'
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

type Props = {
  content: string;
  style?: string;
};

export default function ToastUiViewer({ content, style }: Props) {
  return (
    <section className={style}>
      <Viewer initialValue={content} />
    </section>
  );
}
