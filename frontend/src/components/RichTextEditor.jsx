import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Heading2, 
  Heading3,
  Link as LinkIcon,
  Quote,
  X
} from 'lucide-react';
import '../styles/tiptap-editor.css';

function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#0A0A0A] underline cursor-pointer hover:opacity-70',
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const openLinkModal = () => {
    const previousUrl = editor.getAttributes('link').href;
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, '');
    
    setLinkUrl(previousUrl || '');
    setLinkText(text || '');
    setShowLinkModal(true);
  };

  const insertLink = () => {
    if (!linkUrl) {
      setShowLinkModal(false);
      return;
    }

    // If there's selected text, just add the link
    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;

    if (hasSelection) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    } else if (linkText) {
      // If no selection but text provided, insert text with link
      editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
    } else {
      // Just insert the URL as both text and link
      editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkUrl}</a>`).run();
    }

    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  };

  const ToolbarButton = ({ onClick, isActive, disabled, icon: Icon, title }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`tiptap-toolbar-button ${isActive ? 'is-active' : ''}`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <>
    <div className="tiptap-editor-wrapper">
      {/* Toolbar */}
      <div className="tiptap-toolbar">
        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={Heading2}
          title="Heading 2"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          icon={Heading3}
          title="Heading 3"
        />

        <div className="tiptap-toolbar-divider" />

        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={Bold}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={Italic}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          icon={UnderlineIcon}
          title="Underline"
        />

        <div className="tiptap-toolbar-divider" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={List}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={ListOrdered}
          title="Numbered List"
        />

        <div className="tiptap-toolbar-divider" />

        {/* Link & Quote */}
        <ToolbarButton
          onClick={openLinkModal}
          isActive={editor.isActive('link')}
          icon={LinkIcon}
          title="Add Link"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={Quote}
          title="Blockquote"
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>

    {/* Link Modal - No backdrop, just floating modal */}
    {showLinkModal && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-2xl p-6 w-[480px] shadow-2xl border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-normal text-[#0A0A0A]">Insert Link</h3>
            <button
              onClick={() => setShowLinkModal(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-[#6B7280]" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2">URL *</label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && insertLink()}
              />
            </div>

            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2">Link Text (optional)</label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Click here"
                className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && insertLink()}
              />
              <p className="text-xs text-[#9CA3AF] mt-1">Leave empty if you have text selected</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            {editor.isActive('link') && (
              <button
                onClick={removeLink}
                className="flex-1 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm hover:bg-red-100 transition-colors cursor-pointer"
              >
                Remove Link
              </button>
            )}
            <button
              onClick={() => setShowLinkModal(false)}
              className="flex-1 px-4 py-3 bg-[#F9FAFB] text-[#6B7280] rounded-xl text-sm hover:bg-[#E5E7EB] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={insertLink}
              className="flex-1 px-4 py-3 bg-[#0A0A0A] text-white rounded-xl text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default RichTextEditor;
