"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Tulis deskripsi..." }: RichTextEditorProps) {
  const quillRef = useRef<any>(null)

  useEffect(() => {
    // Import Quill styles
    if (typeof window !== "undefined") {
      import("react-quill/dist/quill.snow.css")
    }
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block'],
      [{ 'table': true }],
    ],
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'script',
    'direction',
    'color',
    'background',
    'align',
    'link',
    'image',
    'video',
    'code-block',
    'table',
  ]

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-background"
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 200px;
          font-size: 14px;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
          color: hsl(var(--foreground));
        }
        .rich-text-editor .ql-snow {
          border-color: hsl(var(--border));
        }
        .rich-text-editor .ql-toolbar {
          border-color: hsl(var(--border));
          background: hsl(var(--background));
        }
        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: hsl(var(--foreground));
        }
        .rich-text-editor .ql-toolbar .ql-fill {
          fill: hsl(var(--foreground));
        }
        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button.ql-active {
          color: hsl(var(--primary));
        }
        .rich-text-editor .ql-toolbar button:hover .ql-stroke,
        .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: hsl(var(--primary));
        }
        .rich-text-editor .ql-toolbar button:hover .ql-fill,
        .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
          fill: hsl(var(--primary));
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  )
}
