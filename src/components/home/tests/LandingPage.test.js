import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import {LandingPage} from '../Landing-page';

it('renders without crashing', () => {
    const mocks=jest.fn();
  const wrapper=shallow(<LandingPage  dispatch={mocks}/>);
  console.log(wrapper.debug());

});