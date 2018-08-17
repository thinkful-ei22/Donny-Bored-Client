import React from 'react';
import {connect} from 'react-redux';
import {clearImages,loadHomepage} from '../../actions/images.js';
import {Link} from 'react-router-dom';
import DragRect from '../moodboard/DragRect';
import './about.css';

export class LogoMain extends React.Component{

  constructor(props){
    super(props);
    this.state={
      about:{display:"none"}
    }

  }

  componentWillMount() {
      this.props.dispatch(loadHomepage());
    }

    //clears images store object from redux store   
  componentWillUnmount(){
      this.setState({changeFont:false});
      this.props.dispatch(clearImages());  
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
            <header className="logo-main" role="banner">
                <h1><span id="boredtext">bored</span> </h1>
                <span> <button aria-label="About" title="What is Bored?" id="about_button" onClick={this.showAbout}> what do you mean?</button></span>      
            </header>

              {
                this.props.imageIds.map(imageId =>{
                    return  <DragRect  imageId={imageId} key={imageId} image={this.props.images[imageId]} dispatcher={()=>null}></DragRect>
                  })    
              } 

               <nav className="home">
                        <Link to="/register"><button aria-label="Sign Up">Sign Up</button></Link><span> <Link to="/login"><button aria-label="Login"> Login</button></Link> </span>
                    </nav>

              <section id="about_info" style={this.state.about}>
                <div className="aboutcontent">
                  <h3 lang="en">What is Bored?</h3>
                   <p lang="en">Bored is a simple desktop web app for organizing your images into collections or "moodboards."
                      Make a board, drag and drop your images into the browser and then resize/rearrange/rotate them 
                      however you feel like until you're totally bored. You don't have to though, it's cool. </p>
                  <button  aria-label="Close Info" onClick={this.hideAbout} >Ok, Got it</button>
                </div>
              </section>
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