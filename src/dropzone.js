import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux'
import axios from 'axios';
import Dragtest from './dragtest';
import {fetchImages} from './actions/images';

export class Basic extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        files: [] ,
        moodboardImages : []
      };
    }

    //gets list of images as json object array from our server, add it to our state
    getImages(){
          fetch('http://localhost:9090/api/moodboards/1')
          .then(response =>{
           //console.log('RESPONSE JSON',response.json());
            return response.json();
          })
          .then(console.log('MY STATE PROPS', this.props, this.props.state));
    } 
    
    saveImages(){
       //const update = moodboardImages


    }

    //LIFE CYCLE
    componentDidMount() {
     this.props.dispatch(fetchImages())
     //.then(console.log('MY STATE PROPS',this.props));  
     // .then(([data]) => this.props.state.setState({ moodboardImages :data.images}));
    }
        
    //DROPZONE handler
    onDrop(files) {
      console.log(files);
        const uploaders = files.map(file => {
          // Initial FormData
          //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
          const formData = new FormData();
          formData.append('file', file);
          formData.append('moodboard_id',1)
          
          // Make an AJAX upload request using Axios 
          // return axios.post("http://localhost:9090/api/cloudinary", formData, {
          //   headers: { "X-Requested-With": "XMLHttpRequest" },
          // }).then(response => {  
          //   console.log(response);
          // })

          //using fetch insead of Axios library
         return fetch("http://localhost:9090/api/cloudinary",{
            method:'POST',
            headers: { "X-Requested-With": "XMLHttpRequest" },
            body:formData
          })
          .then(response => console.log(response) );
        });

        // Once all the files are uploaded 
        Promise
          .all(uploaders)
          .then(() => {
            this.getImages();
            //console.log('MOODBORED IMAGES' + this.state.moodboardImages);
        });
    }

    render() {

      return (
        <section>
          <div className="dropzone">
            <Dropzone disableClick={false} disablePreview={true} onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <div><button onClick={()=> console.log(this.state.moodboardImages)}>GET IMAGES</button></div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
               this.props.moodboardImages.map(image =>{
                  const index =  this.props.moodboardImages.indexOf(image);
                // return <li key={image.id}><img src={image.imageurl} /></li>
                  return  <Dragtest image={image} key={index}></Dragtest>
               })
              } 
              
            </ul>
          </aside>
        </section>
      );
    }
  }
  const mapStateToProps = state => ({
    moodboardImages: state.images.moodboardImages
});

  export default connect(mapStateToProps)(Basic);