import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import DeleteOverlay from '../Delete-overlay';

it('renders without crashing', () => {
  const wrapper=shallow(<DeleteOverlay/>);
  console.log(wrapper.debug());

});
