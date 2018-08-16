import React from 'react';
import {shallow,mount} from 'enzyme';
import LoginForm from '../Login-form.js';

it('renders without crashing', () => {
  const wrapper=shallow(<LoginForm/>);
  console.log(wrapper.debug());

});
