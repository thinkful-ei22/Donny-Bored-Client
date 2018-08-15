import React from 'react';
import {connect} from 'react-redux';
import {clearImages,loadHomepage} from '../../actions/images.js';
import Letter from './Letter';
import DragRect from '../moodboard/DragRect';

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

class LogoMain extends React.Component{

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

    componentWillMount() {
      this.props.dispatch(loadHomepage());

    }


    componentDidMount() {
      // this.interval = setInterval(() => this.tick(), 100);
     // this.splitLetters();
    }
    
    splitLetters(){
      let string = "boring";
      this.setState({boredstring: string.split("")});

    }
  
    //clears images store object from redux store   
    componentWillUnmount(){
      this.setState({changeFont:false});
      this.props.dispatch(clearImages());
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
       <div id="blank"> 
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

              {
                this.props.imageIds.map(imageId =>{
                    return  <DragRect imageId={imageId} key={imageId} image={this.props.images[imageId]} dispatcher={()=>null}></DragRect>
                  })    
              } 

            {/* <div id="img_jordan"><img src="assets/jordan.jpg" /></div> */}
            {/* <div id="img_puppy"><img src="assets/puppyjack.gif" /></div> */}
            {/* <div id="img_monalisa"><img src="assets/board.gif" /></div> */}
            {/* <div id="img_pcl"><img src="assets/pcl.jpg" /></div> */}
            {/* <div id="img_angels"><img src="assets/angels.png" /></div> */}
            {/* <div id="img_poster"><img src="assets/poster.png" /></div> */}
            {/* <div id="img_fruits"><img src="assets/fruits.png" /></div> */}
            {/* <div id="img_bed"><img src="assets/bed.png" /></div>
            <div id="img_kleenex"><img src="assets/kleenex.png" /></div>
            <div id="img_smiley"><img src="assets/hi.gif" /></div> */}
           {/* <div id="img_happy"><img src="assets/homehappy.jpg" /></div> */}
        </div>
      );
    }

};
const mapStateToProps = state => {
  return {
      images:state.images.allImages,
      imageIds:state.images.imageIds

  };
};

export default connect(mapStateToProps)(LogoMain);