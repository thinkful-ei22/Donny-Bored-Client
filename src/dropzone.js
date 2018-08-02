import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class Basic extends React.Component {
    constructor() {
      super()
      this.state = { 
        files: [] ,
        moodboardImages : []
      };
    }

    //gets list of images as json object array from our server, add it to our state
    getImages(){
          fetch('http://localhost:9090/api/moodboards/1')
          .then(response =>{
          // console.log(response.json());
            return response.json();
          })
          .then(([data]) => this.setState({ moodboardImages :data.images}));
    } 
    

    //LIFE CYCLE
    componentDidMount() {
     this.getImages();
    }
        
    //DROPZONE handler
    onDrop(files) {
      console.log(files);
    // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append('file', file);
          formData.append('moodboard_id',1)
          
          // Make an AJAX upload request using Axios 
          return axios.post("http://localhost:9090/api/cloudinary", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {  
            console.log(response);
          })
        });

        // Once all the files are uploaded 
        axios
          .all(uploaders)
          .then(() => {
            this.getImages();
            console.log('MOODBORED IMAGES' + this.state.moodboardImages);
        });
    }

    render() {

      return (
        <section>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
               this.state.moodboardImages.map(image =>{
                
              return  <li key={image.id}><img src={image.imageurl} /></li>
               })
              } 
              
            </ul>
          </aside>
        </section>
      );
    }
  }
