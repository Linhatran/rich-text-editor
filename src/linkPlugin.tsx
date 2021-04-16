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
