import React from 'react';
import { DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js';

interface RichTextEditorProps {}

class RichTextEditor extends React.Component<RichTextEditorProps, any> {
  constructor(props: RichTextEditorProps) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
    this.handleBoldClick = this.handleBoldClick.bind(this);
    this.handleItalicClick = this.handleItalicClick.bind(this);
    this.handleUnderlineClick = this.handleUnderlineClick.bind(this);

  }
  handleChange = (editorState: EditorState) => this.setState({ editorState });

  handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
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
        <button className='btn btn-sm' onClick={this.handleBoldClick}>
          B
        </button>
        <button className='btn btn-sm' onClick={this.handleItalicClick}>
          I
        </button>
        <button className='btn btn-sm' onClick={this.handleUnderlineClick}>
          U
        </button>
        {/* <button className='btn btn-sm' onClick={this.handleCode}>
          Code
        </button>
        <button className='btn btn-sm' onClick={this.handleBulletPoints}>
          List
        </button> */}
        <div className='border'>
          <Editor
            editorState={this.state.editorState}
            onChange={(e) => this.handleChange(e)}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </>
    );
  }
}
export default RichTextEditor;
