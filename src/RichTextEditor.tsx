import React from 'react';
import {
  convertToRaw,
  EditorState,

} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import './App.css';
import Modal from './Modal';
import Firebase from 'firebase';
import config from '../config';
interface RichTextEditorProps {}
interface RichTextEditorState {
  editorState: EditorState;
  text:string
}
const getHtml = (editorState:EditorState) =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));
class RichTextEditor extends React.Component<
  RichTextEditorProps,
  RichTextEditorState
> {
  constructor(props: RichTextEditorProps) {
    super(props);
    Firebase.initializeApp(config);
    this.state = {
      editorState: EditorState.createEmpty(),
      text:''
    };
  }
  handleChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  render() {
    return (
      <>
        <div className='editor rounded-bottom' data-testid='editor'>
          <Editor
            editorState={this.state.editorState}
            onEditorStateChange={this.handleChange}
            wrapperClassName='wrapper-class'
            editorClassName='editor-class'
            toolbarClassName='toolbar-class'
          />
        </div>
        <div className='col-12 col-md-6'>
          {/* render a preview for the text in the editor */}
          <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
        </div>
        <h4 className='mt-4 mb-3'>HTML code</h4>{' '}
        <div className='html-view rounded'>
          {getHtml(this.state.editorState)}{' '}
        </div>
        <button
          className='btn btn-warning btn-lg mt-3'
          data-toggle='modal'
          data-target='#saveModal'
        >
          Save
        </button>
        
      </>
    );
  }
}




export default RichTextEditor;
