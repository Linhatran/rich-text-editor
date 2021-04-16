import React from 'react';
import { DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js';
import linkPlugin from './linkPlugin';

interface RichTextEditorProps {}

class RichTextEditor extends React.Component<RichTextEditorProps, any> {
  plugins: { keyBindingFn(e: any, { getEditorState }: any): "add-link" | undefined; handleKeyCommand(cmd: string, editorState: EditorState, { setEditorState }: any): "handled" | "not-handled"; decorators: {  }[]; }[];
  constructor(props: RichTextEditorProps) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
    this.plugins = [linkPlugin];

    this.handleBoldClick = this.handleBoldClick.bind(this);
    this.handleItalicClick = this.handleItalicClick.bind(this);
    this.handleUnderlineClick = this.handleUnderlineClick.bind(this);
    this.handleCodeFormat = this.handleCodeFormat.bind(this);
    this.handleUnorderedList = this.handleUnorderedList.bind(this);
    this.handleOrderedList = this.handleOrderedList.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
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
  handleCodeFormat() {
    this.handleChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'CODE')
    );
  }
  handleUnorderedList() {
    this.handleChange(
      RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item')
    );
  }
  handleOrderedList() {
    this.handleChange(
      RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item')
    );
  }
  handleAddLink() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const link = window.prompt('Paste link to nagivate to...');
    if (link === '') {
      this.handleChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      'create-entity'
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.handleChange(
      RichUtils.toggleLink(newEditorState, selection, entityKey)
    );
    return 'handled';
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
        <button className='btn btn-sm' onClick={this.handleCodeFormat}>
          Code
        </button>
        <button className='btn btn-sm' onClick={this.handleUnorderedList}>
          UL
        </button>
        <button className='btn btn-sm' onClick={this.handleOrderedList}>
          OL
        </button>
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
