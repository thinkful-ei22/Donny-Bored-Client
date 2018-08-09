import React from 'react';
import Letter from './Letter';

const flexContainerStyle = {
  // alignContent: 'center',
  // alignItems: 'center',
  // boxSizing: 'border-box',
  // display: 'flex',
  // flexDirection: 'row',
  // flexWrap: 'nowrap',
  // justifyContent: 'center',
  // height:'100%',
  fontFamily:'fantasy' 

}

const fontFam=['sans-serif','serif','fantasy','monospace','cursive']



export default class LogoMain extends React.Component{

  constructor(props){

    super(props);
    this.state={
      changeFont:true,
      fontFamily: null,
      seconds: 0,
      boredstring:['b','o','r','e','d']
      

    }

   
  }

    tick() {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
      let font = this.generateNum();
      this.setState({fontFamily:fontFam[font]});
      console.log('tick tock');
    }


    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 100);
     // this.splitLetters();
    }
    
    splitLetters(){
      let string = "boring";
      this.setState({boredstring: string.split("")});

    }
  
    //clears images store object from redux store   
    componentWillUnmount(){
      this.setState({changeFont:false});
      clearInterval(this.interval);
     
   }
    generateNum =()=>{
      return Math.floor(Math.random()*fontFam.length);
    }

    getRandFam=()=>{
      let font=this.generateNum();
      this.setState({fontFamily : fontFam[font]});     
     
     // return {fontFamily: fontFam[font]};

    }    

    

 
    
 
    render(){
   
     
      //setTimeout(this.getRandFam,1200);
      return (
        <header className='logo-main marginadjust' style={flexContainerStyle}>
             <h1><span id="boredtext">bored</span> </h1>
         {/* {
            this.state.boredstring.map(letter =>{
              return <Letter letter={letter}></Letter>
              })
         }   
             
              */}
             {/* <div> <span>Register  <img src='assets/pencil.png'/>   Login</span> </div> */}
        </header>
      );
    }

};