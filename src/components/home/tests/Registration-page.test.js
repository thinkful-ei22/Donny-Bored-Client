import React from 'react';
import {shallow,mount} from 'enzyme';
import {RegistrationPage} from '../Registration-page';

it('renders without crashing', () => {
    const mocks=jest.fn();
  const wrapper=shallow(<RegistrationPage  dispatch={mocks}/>);
  console.log(wrapper.debug());

});