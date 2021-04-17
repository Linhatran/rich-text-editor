import React from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import './App.css';
import firebase from './utils/firebase';
import 'firebase/database';
interface RichTextEditorProps {}
interface RichTextEditorState {
  editorState: EditorState;
  currentNotes: Object[]
}
const getHtml = (editorState: EditorState) =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));
class RichTextEditor extends React.Component<
  RichTextEditorProps,
  RichTextEditorState
> {
  constructor(props: RichTextEditorProps) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      currentNotes: [],
    };
  }
  handleChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };
  saveNote = () => {
    const noteRefs = firebase.database().ref('notes');
    const note = {
      text: getHtml(this.state.editorState),
    };
    noteRefs.push(note);
  };
  componentDidMount = () => {
    const noteRefs = firebase.database().ref('notes');
    noteRefs.on('value', (snapshot) => {
      this.setState({currentNotes: snapshot.val()})
    })
     console.log(this.state.currentNotes);
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

        <div className='col-6'>
          <h4 className='mt-4 mb-3'>HTML code</h4>
          <div className='html-view rounded col-12'>
            {getHtml(this.state.editorState)}
          </div>
          <button
            className='btn btn-warning btn-lg mt-3 text-left'
            data-toggle='modal'
            data-target='#saveModal'
            onClick={this.saveNote}
          >
            Save
          </button>
        </div>
        <div className='col-6'>
          <h4 className='mt-4 mb-3'>Current notes</h4>
          <div className='html-view rounded col-12'>
            
          </div>
          
        </div>
      </>
    );
  }
}

export default RichTextEditor;
