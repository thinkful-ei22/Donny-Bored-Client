import React from 'react';
import {connect} from 'react-redux';
import {clearImages,loadHomepage} from '../../actions/images.js';
import {Link, Redirect} from 'react-router-dom';
import DragRect from '../moodboard/DragRect';
import './about.css';



const fontFam=['sans-serif','serif','fantasy','monospace','cursive']

export class LogoMain extends React.Component{

  constructor(props){

    super(props);
    this.state={
      changeFont:true,
      fontFamily: null,
      seconds: 0,
      boredstring:['b','o','r','e','d'],
      about:{display:"none"}

  
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
      //clearInterval(this.interval);
     
   }
    generateNum =()=>{
      return Math.floor(Math.random()*fontFam.length);
    }

    getRandFam=()=>{
      let font=this.generateNum();
      this.setState({fontFamily : fontFam[font]});     
     
     // return {fontFamily: fontFam[font]};

    }    

    

   showAbout =()=>{
      this.setState({
        about:{display:"block"}

      })


   }

   hideAbout =()=>{
    this.setState({
      about:{display:"none"}

    })


 }
  
    
 
    render(){
   
     
      //setTimeout(this.getRandFam,1200);
      return (
       <div id="blank" className="fadeInFast"> 
            <header className="logo-main">
                <h1><span id="boredtext">bored</span> </h1>
                <span> <button title="What is Bored?" id="about_button" onClick={this.showAbout}> what do you mean?</button></span>      
            </header>

              {
                this.props.imageIds.map(imageId =>{
                    return  <DragRect  imageId={imageId} key={imageId} image={this.props.images[imageId]} dispatcher={()=>null}></DragRect>
                  })    
              } 

               <div className="home">
                        <Link to="/register"><button>Sign Up</button></Link><span> <Link to="/login"><button> Login</button></Link> </span>
                    </div>

              <div id="about_info" style={this.state.about}>
                <div className="aboutcontent">
                  <h3>What is Bored?</h3>
                   <p>Bored is a simple desktop web app for organizing your images into collections or "moodboards."
                      Make a board, drag and drop your images into the browser and then resize/rearrange/rotate them 
                      however you feel like until you're totally bored. You don't have to though, it's cool. </p>
                  <button onClick={this.hideAbout} >Ok, Got it</button>
                </div>
              </div>
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