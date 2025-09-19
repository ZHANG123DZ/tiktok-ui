import { useState, useRef, useEffect } from 'react';
import {
  Editor,
  EditorState,
  getDefaultKeyBinding,
  convertToRaw,
  ContentState,
  Modifier,
} from 'draft-js';
import createImagePlugin from '@draft-js-plugins/image';
import styles from './ChatInput.module.scss';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

function ChatInput({
  value = '',
  placeholder = 'Send a message...',
  onSubmit,
  onChange,
  onPasteImages,
  submitSignal,
  submitEvenIfEmpty = false,
  onInsertEmojiRef,
}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef(null);
  const lastSignalRef = useRef(submitSignal);

  const insertEmoji = (emoji) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const newContentState = Modifier.insertText(
      contentState,
      selectionState,
      emoji
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );

    setEditorState(
      EditorState.forceSelection(
        newEditorState,
        newContentState.getSelectionAfter()
      )
    );
  };

  useEffect(() => {
    if (onInsertEmojiRef) {
      onInsertEmojiRef.current = insertEmoji;
    }
  }, [editorState]);

  useEffect(() => {
    const currentText = editorState.getCurrentContent().getPlainText();
    if (value !== currentText) {
      const content = ContentState.createFromText(value || '');
      setEditorState(EditorState.createWithContent(content));
    }
  }, [value]);

  const submitMessage = ({ force = false } = {}) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const text = raw.blocks
      .map((b) => b.text)
      .join('\n')
      .trim();

    const images =
      Object.values(raw.entityMap || {})
        .filter((e) => e?.type === 'IMAGE')
        .map((e) => e?.data?.src) || [];

    if (force || text || images.length > 0) {
      onSubmit?.({ text, images });
      setEditorState(EditorState.createEmpty()); // reset editor
    }
  };

  const handleChange = (state) => {
    setEditorState(state);
    onChange?.(state.getCurrentContent().getPlainText());
  };

  const handleKeyBinding = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) return 'submit-message';
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command) => {
    if (command === 'submit-message') {
      submitMessage(); // Enter: chỉ gửi khi có nội dung
      return 'handled';
    }
    return 'not-handled';
  };

  const handlePastedFiles = (files) => {
    onPasteImages?.(files);
  };

  // 🔥 Lắng nghe "tín hiệu" từ nút ngoài
  useEffect(() => {
    if (submitSignal !== lastSignalRef.current) {
      lastSignalRef.current = submitSignal;
      submitMessage({ force: submitEvenIfEmpty }); // có thể force gửi dù text rỗng
    }
  }, [submitSignal, submitEvenIfEmpty]); // phụ thuộc đúng 2 biến

  return (
    <div
      className={`${styles.ChatInputContainer} ${
        isFocused ? styles.Focused : ''
      }`}
      onClick={() => editorRef.current?.focus()}
    >
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleChange}
        plugins={plugins}
        placeholder={placeholder}
        spellCheck={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyBindingFn={handleKeyBinding}
        handleKeyCommand={handleKeyCommand}
        handlePastedFiles={handlePastedFiles}
      />
    </div>
  );
}

export default ChatInput;
