import { RichUtils, KeyBindingUtil, EditorState } from 'draft-js';
import React from 'react';

export const getLinkEntities = (contentBlock:any, callback:any, contentState:any) => {
  contentBlock.findEntityRanges((character:any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};
export const Link = (props:any) => {
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
const addLinkPlugin = {
  keyBindingFn (e:any, { getEditorState}:any) {
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    if (selection.isCollapse()) {
      return;
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.keyCode === 75) {
      return 'add-link';
    }
  },

   handleKeyCommand(
    cmd:string,
    editorState:EditorState,
    { setEditorState }:any
  ) {
    if (cmd !== 'add-link') {
      return 'not-handled';
    }
    const link = window.prompt('Paste link to nagivate to...');
    const selection = editorState.getSelection();
    if (link === '') {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
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
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return 'handled';
  }, 
  decorators: [
      {
          strategy: getLinkEntities,
          component: Link
      }
  ]
}
export default addLinkPlugin;