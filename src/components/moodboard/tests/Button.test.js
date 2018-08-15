import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Button from '../Button.js';

it('renders without crashing', () => {
  const wrapper=shallow(<Button/>);
  console.log(wrapper.debug());

});
