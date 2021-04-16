import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import RichTextEditor from './RichTextEditor';

test('renders app header', () => {
  render(<App />);
  const header = screen.getByTestId('header');
  expect(header).toBeInTheDocument();
});
test('header has round top border', () => {
  render(<App />);
  const header = screen.getByTestId('header');
  expect(header).toHaveClass('rounded-top');
});
test('header has a title', () => {
  render(<App />);
  const header = screen.getByTestId('header');
  expect(header).toHaveTextContent('Your awesome text editor!');
});
test('renders an editor', () => {
  render(<RichTextEditor />);
  const editor = screen.getByTestId('editor');
  expect(editor).toBeInTheDocument();
});
