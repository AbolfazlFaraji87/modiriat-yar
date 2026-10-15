import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

interface BlogEditorProps {
  token: string;
  content: string;
  onChange: (html: string) => void;
}

const UPLOAD_URL = "http://127.0.0.1:8000/api/blog/upload-image/";

const buttonBase =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-40";

const normalButton = `${buttonBase} border-slate-700 bg-slate-900 text-slate-300 hover:border-orange-400/40 hover:text-orange-300`;

const activeButton = `${buttonBase} border-orange-400/30 bg-orange-400/10 text-orange-300`;

export default function BlogEditor({
  token,
  content,
  onChange,
}: BlogEditorProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const extensions = useMemo(
    () => [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    [],
  );

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "tiptap management-editor",
        dir: "rtl",
        "aria-label": "محتوای مقاله",
      },
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content || "");
    }
  }, [editor, content]);

  if (!editor) {
    return (
      <div className="bg-slate-950 p-6 text-sm text-slate-400">
        در حال آماده‌سازی ویرایشگر...
      </div>
    );
  }

  function addLink() {
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("آدرس لینک را وارد کنید:", previousUrl);

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      const parsed = new URL(url);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        setError("فقط لینک‌های HTTP و HTTPS مجاز هستند.");
        return;
      }

      setError("");
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: parsed.href })
        .run();
    } catch {
      setError("آدرس لینک معتبر نیست.");
    }
  }

  async function uploadImage(file?: File) {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    setError("");

    if (!allowedTypes.includes(file.type)) {
      setError("فرمت تصویر باید JPEG، PNG، WebP یا GIF باشد.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail || data?.image || "بارگذاری تصویر ناموفق بود.",
        );
      }

      if (typeof data?.url !== "string") {
        throw new Error("سرور آدرس تصویر را برنگرداند.");
      }

      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در بارگذاری تصویر.");
    } finally {
      setUploading(false);

      if (fileInput.current) {
        fileInput.current.value = "";
      }
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-200">ویرایشگر محتوا</p>
          <p className="mt-1 text-xs text-slate-500">
            قالب‌بندی، تصاویر و ساختار مقاله
          </p>
        </div>

        <span className="rounded-lg border border-orange-400/20 bg-orange-400/5 px-3 py-1.5 text-xs text-orange-300">
          Rich Text
        </span>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-800 bg-slate-900/40 p-3">
        <div className="flex flex-wrap items-center gap-1.5 border-l border-slate-800 pl-2">
          <button
            type="button"
            title="متن ضخیم"
            aria-label="متن ضخیم"
            aria-pressed={editor.isActive("bold")}
            className={editor.isActive("bold") ? activeButton : normalButton}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <strong className="text-base">B</strong>
          </button>

          <button
            type="button"
            title="متن مورب"
            aria-label="متن مورب"
            aria-pressed={editor.isActive("italic")}
            className={editor.isActive("italic") ? activeButton : normalButton}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <em className="text-base">I</em>
          </button>

          <button
            type="button"
            title="زیرخط"
            aria-label="زیرخط"
            aria-pressed={editor.isActive("underline")}
            className={
              editor.isActive("underline") ? activeButton : normalButton
            }
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <u className="text-base">U</u>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-l border-slate-800 pl-2">
          <button
            type="button"
            className={
              editor.isActive("heading", { level: 2 })
                ? activeButton
                : normalButton
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            عنوان ۲
          </button>

          <button
            type="button"
            className={
              editor.isActive("heading", { level: 3 })
                ? activeButton
                : normalButton
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            عنوان ۳
          </button>

          <button
            type="button"
            className={
              editor.isActive("bulletList") ? activeButton : normalButton
            }
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            فهرست
          </button>

          <button
            type="button"
            className={
              editor.isActive("orderedList") ? activeButton : normalButton
            }
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            شماره‌دار
          </button>

          <button
            type="button"
            className={
              editor.isActive("blockquote") ? activeButton : normalButton
            }
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            نقل‌قول
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" className={normalButton} onClick={addLink}>
            افزودن لینک
          </button>

          <button
            type="button"
            className={normalButton}
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            درج جدول
          </button>

          <button
            type="button"
            className={normalButton}
            disabled={uploading}
            onClick={() => fileInput.current?.click()}
          >
            {uploading ? "در حال بارگذاری..." : "درج تصویر"}
          </button>

          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(event) => uploadImage(event.target.files?.[0])}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-3 py-2">
        <div className="flex gap-2">
          <button
            type="button"
            className={normalButton}
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          >
            ↶ بازگشت
          </button>

          <button
            type="button"
            className={normalButton}
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          >
            ↷ تکرار
          </button>
        </div>

        <span className="text-xs text-slate-500">
          تغییرات در فرم مقاله ذخیره می‌شوند
        </span>
      </div>

      {error && (
        <div
          role="alert"
          className="border-b border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      <EditorContent editor={editor} />

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 bg-slate-900/40 px-4 py-3">
        <span className="text-xs text-slate-500">برای نوشتن کلیک کنید</span>
        <span className="text-xs text-orange-400/80">
          مدیریت‌یار · ویرایشگر مقاله
        </span>
      </div>
    </div>
  );
}
