import React from 'react';
import {
  CompositeDecorator,
  convertToRaw,
  EditorState,

} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import './App.css';
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

    const decorator = new CompositeDecorator([
      { strategy: getLinkEntities, component: Link },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
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
          className='btn btn-warning btn-lg'
          data-toggle='modal'
          data-target='#previewModal'
        >
          Save
        </button>
      </>
    );
  }
}

const getLinkEntities = (
  contentBlock: any,
  callback: any,
  contentState: any
) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

const Link = (props: any) => {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      data-testid='anchor-link'
      className='App-link'
      href={url}
      target='_blank'
      rel='noreferrer'
      onClick={() => window.open(url, '_blank')}
    >
      {props.children}
    </a>
  );
};

export default RichTextEditor;
