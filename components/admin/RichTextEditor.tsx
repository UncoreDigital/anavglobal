"use client";

import { useCallback, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TipTap editor for post bodies.
 *
 * Output is HTML, sanitised again at render time — see the blog post page. The
 * toolbar is deliberately short: every control here maps to something
 * `.prose-anav` in globals.css actually styles, so the admin cannot produce
 * markup the public page has no design for.
 */
export default function RichTextEditor({
  value,
  onChange,
  onRequestImage,
  placeholder = "Write the piece…",
}: {
  value: string;
  onChange: (html: string) => void;
  onRequestImage?: () => Promise<string | null>;
  placeholder?: string;
}) {
  const editor = useEditor({
    /*
      Next renders this on the server first; TipTap warns and can mismatch
      unless it is told to wait for the client.
    */
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        /* Every inserted link is external by definition here. */
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose-anav min-h-[26rem] max-w-none px-6 py-5 focus:outline-none [&_p.is-editor-empty:first-child::before]:pointer-events-none [&_p.is-editor-empty:first-child::before]:float-left [&_p.is-editor-empty:first-child::before]:h-0 [&_p.is-editor-empty:first-child::before]:text-slate-400 [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
      },
    },
    onUpdate: ({ editor: instance }) => onChange(instance.getHTML()),
  });

  /*
    Sync external changes (loading a post after mount) without stomping what the
    admin is typing — comparing against getHTML() first is what prevents the
    caret jumping to the end on every keystroke.
  */
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(async () => {
    if (!editor) return;
    const url = onRequestImage
      ? await onRequestImage()
      : window.prompt("Image URL", "https://");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor, onRequestImage]);

  if (!editor) {
    return <div className="h-[30rem] animate-pulse rounded-xl border border-border bg-slate-50" />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white focus-within:border-brand">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-slate-50 p-2">
        <Tool
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="Bold"
          icon={Bold}
        />
        <Tool
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="Italic"
          icon={Italic}
        />
        <Tool
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          label="Underline"
          icon={UnderlineIcon}
        />
        <Tool
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          label="Inline code"
          icon={Code}
        />

        <Divider />

        <Tool
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
          icon={Heading2}
        />
        <Tool
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          label="Heading 3"
          icon={Heading3}
        />

        <Divider />

        <Tool
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="Bullet list"
          icon={List}
        />
        <Tool
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="Numbered list"
          icon={ListOrdered}
        />
        <Tool
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="Quote"
          icon={Quote}
        />

        <Divider />

        <Tool
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          label="Align left"
          icon={AlignLeft}
        />
        <Tool
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          label="Align centre"
          icon={AlignCenter}
        />
        <Tool
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          label="Align right"
          icon={AlignRight}
        />

        <Divider />

        <Tool onClick={setLink} active={editor.isActive("link")} label="Add link" icon={Link2} />
        <Tool
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          label="Remove link"
          icon={Link2Off}
        />
        <Tool onClick={addImage} label="Insert image" icon={ImagePlus} />

        <div className="ml-auto flex gap-0.5">
          <Tool
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            label="Undo"
            icon={Undo2}
          />
          <Tool
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            label="Redo"
            icon={Redo2}
          />
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

function Tool({
  onClick,
  active,
  disabled,
  label,
  icon: Icon,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:opacity-30",
        active
          ? "bg-navy-deep text-white"
          : "text-ink-muted hover:bg-white hover:text-navy-deep"
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />;
}
