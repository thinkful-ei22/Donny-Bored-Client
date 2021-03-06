import React from 'react';
import {shallow,mount} from 'enzyme';
import BoardList from '../Boardlist';

it('renders without crashing', () => {
  const wrapper=shallow(<BoardList/>);
  console.log(wrapper.debug());

});

it('Should render the list of boards', ()=>{
  const moodboards =  {
       35: { 
         "id": 35,
        "board_name": "Mood NYC",
        "user_id": 9,
        "description": "Mood is based in NYC; skate apparel & accessories. ",
        "username": "bigbean",
        "images": []
      }
      ,
  
      37: {"id": 37,
        "board_name": "Stone Age",
        "user_id": 9,
        "description": "We livin it",
        "username": "bigbean",
        "images": []
       
       },
    
       38:{ "id": 38,
        "board_name": "test",
        "user_id": 9,
        "description": "tests",
        "username": "bigbean",
        "images": []
       }
    }
  

  const boardIds=[35,37,38];

  const wrapper=shallow(<BoardList moodboards={moodboards} moodboardIds={boardIds}/>);
  wrapper.setState({moodboards});

  const lis = wrapper.find('.board-list-item');
  expect(lis.length).toEqual(boardIds.length);
  
  
  for(let i=0; i++; i< boardIds.length){
    let liKey= lis.at(i).key();
    expect(liKey).toEqual(boardIds[i].toString()); 
  }


});
