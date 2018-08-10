import React, { Component } from 'react';

import Board from './Board'
import Menubar from './Menubar';

export default class BoardContainer extends Component {


    componentDidMount() {
      
        console.log('BOARDCONTAINER PROPS MATCH PARMAS',this.props);
        //console.log('what is it', this.props);  
        // .then(([data]) => this.props.state.setState({ moodboardImages :data.images}));
       }

    render(){

        return( 
            <div id="board_container">
                <div id="board_menu">
                    <Menubar/>
                </div>
        
                     <Board boardId={this.props.match.params.boardId}/>

             </div>



        )

    }


}