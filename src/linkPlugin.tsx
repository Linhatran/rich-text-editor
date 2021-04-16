import { RichUtils, KeyBindingUtil, EditorState, ContentBlock } from 'draft-js';
import React from 'react';

export const getLink = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};
export const Link = (props) => {
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
export default function addLinkPlugin () {
    keyBindingFn(e, {getEditorState}) {
        const editorState = getEditorState();
        const selection = editorState.getSelection();
        if (selection.isCollapse()) {
            return
        }
        if (KeyBindingUtil.hasCommandModifier(e) && e.keyCode === 75) {
            return 'add-link'
        }
    }
}