import React from 'react';
import ReactDOM from 'react-dom';
import Menubar from '../components/moodboard/Menubar.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Menubar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
