import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import LoadingScreen from '../Loading-screen.js';

it('renders without crashing', () => {
  const wrapper=shallow(<LoadingScreen/>);
  console.log(wrapper.debug());

});
