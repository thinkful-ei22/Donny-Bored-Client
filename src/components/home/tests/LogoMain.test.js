import React from 'react';
import {shallow,mount} from 'enzyme';
import {LogoMain} from '../LogoMain';
import {initialImages,initialIds} from '../homepagedata';

it('renders without crashing', () => {
    const mocks=jest.fn();
    
  const wrapper=shallow(<LogoMain images={initialImages} imageIds={initialIds} dispatch={mocks}/>);
  console.log(wrapper.debug());

});