import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import MoodboardForm from '../Moodboard-form';

it('renders without crashing', () => {
  const wrapper=shallow(<MoodboardForm/>);
  console.log(wrapper.debug());

});
