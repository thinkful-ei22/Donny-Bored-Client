import React from 'react';
import {connect} from 'react-redux'
// import axios from 'axios';
import requiresLogin from '../home/Requires-login';
import DragRect from './DragRect';
import {deleteImage, fetchImages, updateImage,clearImages, clearUpdatedImages,saveImages,editImageMode} from '../../actions/images';
import {setMoodboardId} from '../../actions/moodboards';
// import {API_BASE_URL} from '../../config.js'
import Fullscreen from './Fullscreen';
import Menubar from './Menubar';
import './board.css';
import './view-grid.css';
import LoadingScreen from './Loading-screen';
import DeleteOverlay from './Delete-overlay';




export class Board extends React.Component {

     constructor(props){
       super(props);
       this.state={
          viewMode: "free",
          deleteMode:false,
          zoomOut:{transform:'scale(0.5)'},
          zoomIn:{transform:'scale(2)'},
          scaleFactor:{transform:'scale(1)'},
          width: window.innerWidth,
          boardId:this.props.match.params.boardId
       
       }

     }

  

    componentWillMount() {
     
      window.addEventListener('resize', this.handleWindowSizeChange);
    }


    componentDidMount() {
     this.props.dispatch(clearImages());
     this.props.fetchImages(this.state.boardId);
     this.props.dispatch(setMoodboardId(this.state.boardId));
     console.log('PROPS MATCH PARMAS',this.props);
     console.log('BOARD TEST HISTORY',this.props.history);
     //console.log('what is it', this.props);  
     // .then(([data]) => this.props.state.setState({ moodboardImages :data.images}));
    }

     //clears images store object from redux store   
    componentWillUnmount(){
       this.props.clearImages();
       this.props.clearUpdatedImages();
       //check to see if delete mode is enabled if true turn off (this works okay for now )
       if(this.props.editMode){
         console.log(this.props.editMode);
         this.props.dispatch(editImageMode())
       }
       window.removeEventListener("dragover", e => console.log('removed drageleavelistner'));
       window.removeEventListener('resize', this.handleWindowSizeChange);
       console.log('UNMOUNTING?');
    }

    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });
    };
   
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
     
      }


    setViewMode=(mode)=>{
      this.setState({ 
        viewMode:mode
      })
    }

    deleteModeToggle=()=>{
      this.setState({
        deleteMode: !this.state.deleteMode
      })
    }


    saveUploadImages(imageId=631,xpos,ypos,width,height){
      const updatedImageIdList = this.props.updatedImageIds;
      const images = this.props.allImages;
      console.log('Saving Images...',updatedImageIdList);
      this.props.saveImages(updatedImageIdList, images);
   }


      handleHome = () => {
        this.props.history.push('/dashboard');
        console.log('BUTTON TEST HISTORY',this.props.history.location.pathname==='/dashboard');
      }

    



    render() {
      const imagesIds = this.props.imageIds;
      const images =  this.props.allImages;

      const { width } = this.state;
      const isMobile = width <= 500;
     

      
    

      if(!this.props || imagesIds === undefined){
        return null; //You can change here to put a customized loading spinner 
      }
  
      return (
        <div id="board-container">
             <LoadingScreen loading={this.props.loading}/>
            <div className="mobile_menu1" style={isMobile ? {display:"block"} : {display:"none"}}>
               
    


            </div>


            <div id="board_menu" style={isMobile ? {display:"none"} : {display:"block"}}>
                  <Menubar editMode={this.props.editMode} viewMode={this.state.viewMode} editImageMode={()=>this.props.editImageMode()} handleHome={()=>this.handleHome()} setViewMode={(mode)=>this.setViewMode(mode)} saveUploadImages={()=>this.saveUploadImages()}/>
            </div>
          
             <section>
                      
                      <Fullscreen  handleHome={()=>this.handleHome()} saveUploadImages={()=>this.saveUploadImages()} getImages={()=>this.getImages()} boardId={this.props.match.params.boardId}/>
                    
                  <aside style={this.state.scaleFactor}>
                  
                    <ul id={isMobile ? "list" : this.state.viewMode}>
                
                    {
                      this.props.imageIds.map(imageId =>{

                          if(this.state.viewMode === "list" || isMobile){
                            return <li style={{position:"relative"}} key={imageId}>
                            <DeleteOverlay handleDelete={()=>this.props.dispatch(deleteImage(imageId,this.props.match.params.boardId))} editMode={this.props.editMode}/>
                            <img src={images[imageId].imageurl} alt="" /></li>
                          } 

                          else if(this.state.viewMode ==="grid"){
                            return <li style={{position:"relative"}} className="grid_block" key={imageId}>
                            <DeleteOverlay handleDelete={()=>this.props.dispatch(deleteImage(imageId,this.props.match.params.boardId))} editMode={this.props.editMode}/>
                            <img src={images[imageId].imageurl} alt="" /></li>
                          }
                          else {

                            return  <DragRect imageId={imageId} key={imageId} image={images[imageId]} dispatcher={(xpos,ypos,width,height)=>this.updateImage(imageId,xpos,ypos,width,height)}></DragRect>
                          }
                        })
                      } 
                      
                    </ul>
                  </aside>
                </section>
            </div>
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

const mapDispatchToProps = dispatch => {
  return {
    fetchImages: (id) =>dispatch(fetchImages(id)),
    clearImages:() => dispatch(clearImages()),
    clearUpdatedImages:()=>dispatch(clearUpdatedImages()),
    saveImages:(imageIds,images)=>dispatch(saveImages(imageIds,images)),
    editImageMode:()=>dispatch(editImageMode())
  }
}

export default requiresLogin()(connect(mapStateToProps,mapDispatchToProps)(Board));