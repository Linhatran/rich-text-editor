import React from 'react';
import './App.css';
import RichTextEditor from './RichTextEditor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';

function App() {
  return (
    <div className='App'>
      <div className='App-header rounded-top' data-testid='header'>
        Your awesome text editor!
      </div>
      <Router>
        <Switch>
          <Route path='/' exact component={RichTextEditor} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
