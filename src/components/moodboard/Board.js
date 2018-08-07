import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux'
import axios from 'axios';
import requiresLogin from '../home/Requires-login';
import DragRect from './DragRect';
import {fetchImages, updateImage} from '../../actions/images';
import {API_BASE_URL} from '../../config.js'

export class Board extends React.Component {

  // constructor(props) {
  //   super(props)
  // }
  
    //gets list of images as json object array from our server, add it to our state
    // getImages(){
    //       fetch(`http://localhost:9090/api/moodboards/${this.props.moodboard}`)
    //       .then(response =>{
    //        //console.log('RESPONSE JSON',response.json());
    //         return response.json();
    //       })
    //       .then(console.log('MY STATE PROPS', this.props, this.props.state));
    // } 
    
  

    //LIFE CYCLE
    componentDidMount() {
     this.props.dispatch(fetchImages(this.props.match.params.boardId));
     console.log('PROPS MATCH PARMAS',this.props.match.params.boardId);
     //console.log('what is it', this.props);  
     // .then(([data]) => this.props.state.setState({ moodboardImages :data.images}));
    }

    componentWillUnmount(){
      //clear images from state


    }
        
    //DROPZONE handler
    onDrop(files) {
      console.log(files);
        const uploaders = files.map(file => {
          // Initial FormData
          //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
          const formData = new FormData();
          formData.append('file', file);
          formData.append('moodboard_id',this.props.match.params.boardId)
          
          // Make an AJAX upload request using Axios 
          // return axios.post("http://localhost:9090/api/cloudinary", formData, {
          //   headers: { "X-Requested-With": "XMLHttpRequest" },
          // }).then(response => {  
          //   console.log(response);
          // })

          //using fetch insead of Axios library
         return fetch(`${API_BASE_URL}/api/cloudinary`,{
            method:'POST',
            body:formData
          })
          .then(response => console.log(response) );
        });

        // Once all the files are uploaded 
        Promise
          .all(uploaders)
          .then(() => {
            this.props.dispatch(fetchImages(this.props.match.params.boardId));
            //console.log('MOODBORED IMAGES' + this.state.moodboardImages);
        });
    }


    getImage(imageId){
      const match = this.props.allImages[imageId];
      return match;
    }

    updateImage(imageId,xpos,ypos,width,height){
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
          <div className="dropzone">
            <Dropzone disableClick={false} disablePreview={true} onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <div><button onClick={()=> this.saveUploadImages()}>Save IMAGES</button></div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
        
             {
              this.props.imageIds.map(imageId =>{
                // const index =  this.props.moodboardImages.indexOf(image);
               // return <li key={image.id}><img src={image.imageurl} /></li>
                 return  <DragRect imageId={imageId} key={imageId} image={this.props.allImages[imageId]} dispatcher={(xpos,ypos,width,height)=>this.updateImage(imageId,xpos,ypos,width,height)}></DragRect>
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



  export default requiresLogin()(connect(mapStateToProps)(Board));