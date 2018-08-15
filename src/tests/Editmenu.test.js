import React from 'react';
import ReactDOM from 'react-dom';
import EditMenu from '../components/moodboard/EditMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});
