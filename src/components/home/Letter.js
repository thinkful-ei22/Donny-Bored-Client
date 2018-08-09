import React from 'react';


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
const color=['red','blue','yellow']



export default class LogoMain extends React.Component{

  constructor(props){

    super(props);
    this.state={
   
      fontFamily: 'sans-serif',
      color:'black',
      seconds: 0,

      

    }

   
  }

    tick() {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
      let font = this.generateNum(fontFam);
   
     // let newColor = this.generateNum(color);
      this.setState({
          fontFamily:fontFam[font],
          
         // color:color[newColor]
        
        });
        
      console.log('tick tock');
    }


    componentDidMount() {
      this.interval = setInterval(() => this.tick(),Math.floor(Math.random()*(2400 - 200 + 1)));
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
    generateNum =(myArray)=>{
      return Math.floor(Math.random()*myArray.length);
    }

    getRandFam=()=>{
      let font=this.generateNum();
      this.setState({fontFamily : fontFam[font]});     
     
     // return {fontFamily: fontFam[font]};

    }    

    

 
    
 
    render(){
   
     
      //setTimeout(this.getRandFam,1200);
      return (
      
         <span className="randomLetter" style={this.state}>{this.props.letter}</span>
        
      );
    }

};