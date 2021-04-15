import React from 'react';
import { DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js';

interface RichTextEditorProps {}
// class RichTextEditor extends React.Component<RichTextEditorProps> {
//   constructor(props: RichTextEditorProps) {
//     super(props);
//     this.state = { editorState: EditorState.createEmpty() };
//   }

//   handleChange = (e: EditorState) => {
//     this.setState({ editorState: e });
//   }

// //   handleKeyCommand = (cmd: string): DraftHandleValue => {
// //     const textState = RichUtils.handleKeyCommand(this.state.editorState, cmd);
// //     if (textState) {
// //       this.handleChange(textState);
// //       return 'handled';
// //     }
// //     return 'not-handled';
// //   };
//   handleKeyCommand = (cmd: string): DraftHandleValue => {
//     if (RichUtils.handleKeyCommand(this.state.editorState, cmd)) {
//       return 'handled';
//     }
//     return 'not-handled';
//   }
//   render() {
//     return (
//       <Editor
//         editorState={this.state.editorState}
//         onChange={(e) => this.handleChange(e)}
//         handleKeyCommand={this.handleKeyCommand}
//       />
//     );
//   }
// }
class RichTextEditor extends React.Component<RichTextEditorProps, any> {
  constructor(props: RichTextEditorProps) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
  }
  handleChange(e: EditorState) {
    this.setState({ editorState: e });
  }
  handleKeyCommand(cmd: string): DraftHandleValue {
    return RichUtils.handleKeyCommand(this.state.editorState, cmd)
      ? 'handled'
      : 'not-handled';
  }
  handleBoldClick() {
    this.handleChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
    );
  }
  handleItalicClick() {
    this.handleChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
    );
  }
  handleUnderlineClick() {
    this.handleChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
    );
  }
  render() {
    return (
      <>
        <button onClick={this.handleBoldClick}>B</button>
        <button onClick={this.handleItalicClick}>I</button>
        <button onClick={this.handleUnderlineClick}>U</button>
        <Editor
          editorState={this.state.editorState}
          onChange={(e) => this.handleChange(e)}
          handleKeyCommand={this.handleKeyCommand}
        />
      </>
    );
  }
}
export default RichTextEditor;
