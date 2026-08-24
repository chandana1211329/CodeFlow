import React from 'react';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  currentLine?: number;
  language?: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ code, onChange, currentLine, language = 'python' }) => {
  const editorRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (editorRef.current && currentLine) {
      const editor = editorRef.current;
      
      // Clear previous decorations
      const decorations = editor.getModel().getAllDecorations();
      editor.deltaDecorations(
        decorations.filter((d: any) => d.options.className === 'current-line-highlight').map((d: any) => d.id),
        []
      );

      // Add highlight for current line
      editor.deltaDecorations(
        [],
        [
          {
            range: {
              startLineNumber: currentLine,
              startColumn: 1,
              endLineNumber: currentLine,
              endColumn: 1000,
            },
            options: {
              isWholeLine: true,
              className: 'current-line-highlight',
              glyphMarginClassName: 'current-line-glyph',
            },
          },
        ]
      );

      // Scroll to the current line
      editor.revealLineInCenter(currentLine);
    }
  }, [currentLine]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Add custom CSS for highlighting
    const style = document.createElement('style');
    style.textContent = `
      .current-line-highlight {
        background-color: rgba(59, 130, 246, 0.2) !important;
        border-left: 3px solid #3b82f6 !important;
      }
      .current-line-glyph {
        background-color: #3b82f6;
        width: 5px;
      }
    `;
    document.head.appendChild(style);
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={language}
        defaultLanguage="python"
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          wordWrap: 'off',
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          glyphMargin: true,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: 'all',
          scrollbar: {
            horizontal: 'visible',
            vertical: 'visible',
            horizontalScrollbarSize: 10,
            verticalScrollbarSize: 10,
            useShadows: false,
          },
        }}
      />
    </div>
  );
};

export default MonacoEditor;
