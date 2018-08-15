import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import RegistrationForm from '../Registration-form';

it('renders without crashing', () => {
  const wrapper=shallow(<RegistrationForm/>);
  console.log(wrapper.debug());

});
