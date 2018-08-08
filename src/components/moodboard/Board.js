import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux'
import axios from 'axios';
import requiresLogin from '../home/Requires-login';
import DragRect from './DragRect';
import {fetchImages, updateImage,clearImages} from '../../actions/images';
import {setMoodboardId} from '../../actions/moodboards';
import {API_BASE_URL} from '../../config.js'
import Fullscreen from './Fullscreen';

export class Board extends React.Component {

    //LIFE CYCLE
    componentDidMount() {
     this.props.fetchImages(this.props.match.params.boardId);
     this.props.dispatch(setMoodboardId(this.props.match.params.boardId));
     console.log('PROPS MATCH PARMAS',this.props);
     //console.log('what is it', this.props);  
     // .then(([data]) => this.props.state.setState({ moodboardImages :data.images}));
    }

     //clears images store object from redux store   
    componentWillUnmount(){
       this.props.clearImages();
       console.log('UNMOUNTING?');
    }
   
    getImages(){
      this.props.fetchImages(this.props.match.params.boardId);
    }

    getImage(imageId){
      const match = this.props.allImages[imageId];
      return match;
    }

    updateImage =(imageId,xpos,ypos,width,height)=>{
       // this.props.dispatch(updateImage());
       this.props.dispatch(updateImage(imageId,xpos,ypos,width,height));
      // console.log('going ot dispatch');

      }

    saveUploadImages(imageId=631,xpos,ypos,width,height){
       
      console.log('Saving Images...');
      const updateImages = this.props.allImages;
      
      const updateImage = this.props.allImages[imageId];
      const updateObjectArray=[];


      for (let key in updateImages) {
        if (updateImages.hasOwnProperty(key)) {
           updateObjectArray.push(updateImages[key]);
        }
      }

      const updaters= updateObjectArray.map(data => {
        //using fetch insead of Axios library
       return fetch(`${API_BASE_URL}/api/images/${data.id}`,{
          method:'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
           body: JSON.stringify(data)
        })
        .then(response => console.log(response) );
      
      
      }); 
      console.log('ToBeUpdated',updateObjectArray);
      // Once all the files are uploaded 
      Promise
        .all(updaters)
        .then(() => {
          //this.props.dispatch(fetchImages());
          console.log('UPATED MOODBOARD' + this.props.allImages);
      });
   }


    render() {
      const imagesIds = this.props.imageIds;
      const images =  this.props.allImages;

      if(!this.props || imagesIds == undefined){
        return null; //You can change here to put a customized loading spinner 
      }
  
      return (
    
        <section>
            <div><button onClick={()=> this.saveUploadImages()}>Save IMAGES</button></div>
              <Fullscreen getImages={()=>this.getImages()} boardId={this.props.match.params.boardId}/>
       
          <aside>
           
            <ul>
        
             {
              this.props.imageIds.map(imageId =>{
                // const index =  this.props.moodboardImages.indexOf(image);
               // return <li key={image.id}><img src={image.imageurl} /></li>
                 return  <DragRect imageId={imageId} key={imageId} image={images[imageId]} dispatcher={(xpos,ypos,width,height)=>this.updateImage(imageId,xpos,ypos,width,height)}></DragRect>
               })
              } 
              
            </ul>
          </aside>
        </section>
      );
    }
  }

const mapStateToProps = state => ({
    allImages: state.images.allImages,
    imageIds: state.images.imageIds,

});

const mapDispatchToProps = dispatch => {
  return {
    fetchImages: (id) =>dispatch(fetchImages(id)),
    clearImages:() => dispatch(clearImages())
  }
}

export default requiresLogin()(connect(mapStateToProps,mapDispatchToProps)(Board));