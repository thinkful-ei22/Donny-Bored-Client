import React from 'react';


export default class Button extends React.Component {
 
   

    handleEvents= () =>{
        this.props.handleClick();
    }

    render() {
      return (
        <button style={!this.props.active ? {border:"0px"} : {border:"1px solid red"}} onClick={()=>this.handleEvents()}><img src={this.props.iconGraphic} alt="" title={this.props.title}/></button>
      )
    }
  }

 