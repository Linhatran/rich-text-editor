import React from 'react';
import './App.css';
import RichTextEditor from './RichTextEditor';

function App() {
  return (
    <div className='App'>
      <div className='App-header rounded-top' data-testid='header'>
        Your awesome text editor!
      </div>
      <div>
        <RichTextEditor />
      </div>
    </div>
  );
}

export default App;
