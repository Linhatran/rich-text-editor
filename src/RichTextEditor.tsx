import React from 'react';
import {
  convertToRaw,
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import './App.css';
import firebase from './utils/firebase';
import 'firebase/database';
interface RichTextEditorProps {}
interface RichTextEditorState {
  editorState: EditorState;
  currentNotes: Object[];
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
    this.handlePastedText = this.handlePastedText.bind(this)
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
  handlePastedText = () => {
    const contentBlocks = convertFromHTML(
      convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text
    );
    const contentState = ContentState.createFromBlockArray(
      contentBlocks.contentBlocks
    );
    this.setState({ editorState: EditorState.createWithContent(contentState) });
  };
  componentDidMount = () => {
    const noteRefs = firebase.database().ref('notes');
    noteRefs.on('value', (snapshot) => {
      const notes = snapshot.val();
      const currentNotes: Object[] = [];
      for (let note in notes) {
        currentNotes.push(notes[note]);
      }
      this.setState({ currentNotes });
    });
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

        <div className='d-flex justify-content-between'>
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
            <button
              className='btn btn-success btn-lg mt-3 ml-2'
              data-toggle='modal'
              data-target='#saveModal'
              onClick={this.handlePastedText}
            >
              Handle pasted text
            </button>
          </div>
          <div className='col-5'>
            <h4 className='mt-4 mb-3'>Current notes</h4>
            {this.state.currentNotes.map((note) => (
              <div className='rounded col-12 bg-light mb-3'>{note.text}</div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default RichTextEditor;
