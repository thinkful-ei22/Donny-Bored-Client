import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import EditMoodboardForm from '../EditMoodboard-form.js';

it('renders without crashing', () => {
  const wrapper=shallow(<EditMoodboardForm/>);
  console.log(wrapper.debug());

});
