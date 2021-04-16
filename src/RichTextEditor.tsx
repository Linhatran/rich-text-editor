import React from 'react';
import {
  CompositeDecorator,
  DraftHandleValue,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import './App.css';
interface RichTextEditorProps {}
interface RichTextEditorState {
    editorState: EditorState
}
class RichTextEditor extends React.Component<RichTextEditorProps, RichTextEditorState> {
  constructor(props: RichTextEditorProps) {
    super(props);

    const decorator = new CompositeDecorator([
      { strategy: getLinkEntities, component: Link },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
    };

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
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentWithEntity,
    });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.handleChange(
      RichUtils.toggleLink(newEditorState, selection, entityKey)
    );
    return 'handled';
  }

  render() {
    return (
      <>
        <div className='btn-group bg-light'>
          <button className='btn btn-sm' onClick={this.handleBoldClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-type-bold'
              viewBox='0 0 16 16'
            >
              <path d='M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z' />
            </svg>
          </button>
          <button className='btn btn-sm' onClick={this.handleItalicClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-type-italic'
              viewBox='0 0 16 16'
            >
              <path d='M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z' />
            </svg>
          </button>
          <button className='btn btn-sm' onClick={this.handleUnderlineClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-type-underline'
              viewBox='0 0 16 16'
            >
              <path d='M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z' />
            </svg>
          </button>
          <button className='btn btn-sm' onClick={this.handleCodeFormat}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-code-slash'
              viewBox='0 0 16 16'
            >
              <path d='M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z' />
            </svg>
          </button>
          <button className='btn btn-sm' onClick={this.handleUnorderedList}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-list-ul'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
              />
            </svg>
          </button>
          <button className='btn btn-sm' onClick={this.handleOrderedList}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-list-ol'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z'
              />
              <path d='M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z' />
            </svg>
          </button>
          <button className='btn btn-sm add-link' onClick={this.handleAddLink}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-link-45deg'
              viewBox='0 0 16 16'
            >
              <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
              <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
            </svg>
          </button>
        </div>
        <div className='editor rounded-bottom'>
          <Editor
            editorState={this.state.editorState}
            onChange={(e) => this.handleChange(e)}
            handleKeyCommand={this.handleKeyCommand}
            handlePastedText={() => 'handled' || true} // prevent default pasting behavior
            placeholder='enter text below...'
          />
        </div>
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
