import React from 'react';
import {shallow} from 'enzyme';
import App from '../App.js';

it('renders without crashing', () => {
  const wrapper=shallow(<App/>);
  console.log(wrapper.debug());

});
