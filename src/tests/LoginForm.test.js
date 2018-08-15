import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import LoginForm from '../components/home/Login-form.js';

it('renders without crashing', () => {
  const wrapper=shallow(<LoginForm/>);
  console.log(wrapper.debug());

});
