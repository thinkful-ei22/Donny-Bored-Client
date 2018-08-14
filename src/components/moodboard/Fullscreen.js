import React from 'react';
import Dropzone from '../dropzone';
import {connect} from 'react-redux';
import {onDropFiles,fetchImages} from '../../actions/images';
import {API_BASE_URL} from '../../config.js';
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

export class FullScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        accept: '',
        files: [],
        fileprogress:null,
        dropzoneActive: false,
        dragActive:false,
        zindex: 9999,
        style : {position: "fixed", width:'100%', height:'100%'},
        mousePosX:0,
        mousePosY:0
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

    getMousePosition=(mouseX,mouseY)=>{
        this.setState({
          mousePosX:mouseX,
          mousePosY:mouseY
        })

    }
       //DROPZONE handler
    onDrop=(files)=>{
      this.props.dispatch(onDropFiles(files,this.state.mousePosX,this.state.mousePosY,this.props.boardId))
       .then(()=> this.props.saveUploadImages())
       .then(()=>{
        this.hideDropzone();
        this.props.dispatch(fetchImages(this.props.boardId));
       })
    }


    hideDropzone =()=>{
      this.setState({
        dropzoneActive: false,
        style:{position:"fixed",width:"100%",height:"100%",zIndex:0}
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
          getMousePosition={(mouseX,mouseY)=> this.getMousePosition(mouseX,mouseY)}
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


  const mapStateToProps = state => ({
    allImages: state.images.allImages,
    imageIds: state.images.imageIds,
    updatedImageIds: state.images.updatedImageIds,
    loading:state.images.loading,
    editMode:state.images.editMode
});
  export default connect(mapStateToProps)(FullScreen);
