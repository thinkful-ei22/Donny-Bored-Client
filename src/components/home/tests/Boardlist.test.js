import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import BoardList from '../Boardlist';

it('renders without crashing', () => {
  const wrapper=shallow(<BoardList/>);
  console.log(wrapper.debug());

});

it('Should render the list of boards', ()=>{
  const moodboards = [
    {
       35: { "id": 35,
        "board_name": "Mood NYC",
        "user_id": 9,
        "description": "Mood is based in NYC; skate apparel & accessories. ",
        "username": "jonny2lips",
        "images": []
      }
    },
    {
        37: {"id": 37,
        "board_name": "Stone Age",
        "user_id": 9,
        "description": "We livin it",
        "username": "jonny2lips",
        "images": []
       }
    },
    {
       38:{ "id": 38,
        "board_name": "Blank Generation",
        "user_id": 9,
        "description": "punk and hxc posters",
        "username": "jonny2lips",
        "images": []
       }
    }
  ]

  const boardIds=[35,37,38];
  const wrapper=shallow(<BoardList moodboards={moodboards} moodboardIds={boardIds}/>);
  wrapper.setState({moodboards});




  const lis = wrapper.find('.board-list-item');

 expect(lis.length).toEqual(boards.length);




});
