import React from 'react';
import Dropzone from 'react-dropzone';
import {API_BASE_URL} from '../../config.js'
import axios from 'axios';


const overlayStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width:'100%',
    height:'100%',
    padding: '2.5em 0',
    background: 'rgba(0,0,0,0)',
    textAlign: 'center',
    color: '#fff'
  };

export default class FullScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        accept: '',
        files: [],
        fileprogress:null,
        dropzoneActive: false,
        dragActive:false,
        zindex: 9999,
        style : {position: "fixed", width:'100%', height:'100%'}
      }
       this.onDragOver = this.onDragOver.bind(this);
     
    }


  
    componentDidMount() {
      window.addEventListener("dragover", this.onDragOver);
      
    }

    componentWillUnmount(){
      window.removeEventListener("dragover", this.onDragOver);
    }


    onDragOver=(e)=>{
      e.preventDefault();
      console.log('MOUSE COORD',e.pageX,e.pageY)
      console.log('dragover');
      this.setState({
        dropzoneActive: true,
        style:{position:"fixed",width:"100%",height:"100%",zIndex:99999}
      })
    }
  
    onDragEnter=(e)=> {
  
        console.log("ONDRAGENTER DROPZONE");
        this.setState({
        dropzoneActive: true,
       
      });
    }
  
    onDragLeave =()=> {
        console.log('ONDRAGLEAVE DROPZONE');
      this.setState({
        dropzoneActive: false,
        style:{position:"fixed",width:"100%",height:"100%",zIndex:0}

      });
    }
  
       //DROPZONE handler
    onDrop=(files)=>{
        console.log('DROPPED',this.props);
       console.log('event',files.clientX);
     
      console.log('FILES',files);
        const uploaders = files.map(file => {
          // Initial FormData
          //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
          const formData = new FormData();
          formData.append('file', file);
          formData.append('moodboard_id',this.props.boardId)
       
          //Make an AJAX upload request using Axios 
          return axios.post("http://localhost:9090/api/cloudinary", formData, {
            onUploadProgress: (p) => {
              console.log('UPLOAD PROGERSS',p.loaded/p.total); 
              this.setState({
                fileprogress: p.loaded / p.total
              })
            }
          }).then(response => { 
            this.setState({
              fileprogress: 1.0,
            }) 
            console.log(response);
          });
          
       
        //   //using fetch insead of Axios library
        //  return fetch(`${API_BASE_URL}/api/cloudinary`,{
        //     method:'POST',
        //     body:formData
        //   })
        //   .then(response => console.log(response) );
        });

        // Once all the files are uploaded 
        axios
          .all(uploaders)
          .then(() => {
              this.props.getImages();
              this.setState({
                dropzoneActive: false,
                style:{position:"fixed",width:"100%",height:"100%",zIndex:0}
              });
           // this.props.dispatch(fetchImages(this.props.boardId));
            //console.log('MOODBORED IMAGES' + this.state.moodboardImages);
        });
    }
  
    applyMimeTypes(event) {
      this.setState({
        accept: event.target.value
      });
    }
  
    render() {
      const { accept, files, dropzoneActive } = this.state;
   
      return (
        <Dropzone
          disableClick
          disablePreview
          style={this.state.style}
          accept={accept}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          {/* { dropzoneActive && <div style={overlayStyle}>Drop files...</div> } */}
        
        
        </Dropzone>
      );
    }
  }
