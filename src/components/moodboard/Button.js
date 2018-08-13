import React from 'react';


export default class Button extends React.Component {
 
     constructor(props){
         super(props)
         this.state={
            active:false,
            style: {
            blue: "1px solid blue",   
             }
         }  
     }

    handleEvents= () =>{
        this.props.handleClick();
    }

    render() {
      return (
        <button style={!this.props.active ? {border:"0px"} : {border:"1px solid red"}} onClick={()=>this.handleEvents()}><img src={this.props.iconGraphic}/></button>
      )
    }
  }

 