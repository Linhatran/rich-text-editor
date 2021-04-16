import React from 'react';
import {
  CompositeDecorator,
  DraftHandleValue,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';


interface RichTextEditorProps {}

class RichTextEditor extends React.Component<RichTextEditorProps, any> {
 
  constructor(props: RichTextEditorProps) {
    super(props);

    const decorator = new CompositeDecorator([
      { strategy: getLinkEntities, component: Link },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      isUrlVisible: false,
      url: '',
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
    console.log(newEditorState);
    return 'handled';
  }

  promptLink() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState({
        isUrlVisible: true,
        url,
      });
    }
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
        <button className='btn btn-sm add-link' onClick={this.handleAddLink}>
          Link
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
      className='link'
      href={url}
      rel='noopener noreferrer'
      target='#'
      aria-label={url}
    >
      {props.children}
    </a>
  );
};
export default RichTextEditor;