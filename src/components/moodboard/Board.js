import React from 'react';
import {connect} from 'react-redux'
// import axios from 'axios';
import requiresLogin from '../home/Requires-login';
import DragRect from './DragRect';
import {deleteImage, fetchImages, updateImage,clearImages, clearUpdatedImages,saveImages,editImageMode} from '../../actions/images';
import {setMoodboardId} from '../../actions/moodboards';
import Fullscreen from './Fullscreen';
import Menubar from './Menubar';
import './board.css';
import './view-grid.css';
import LoadingScreen from './Loading-screen';
import DeleteOverlay from './Delete-overlay';

/*This is the main board component - it needs alot of work, alot of things can be extracted, but this is it for now*/

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
          boardId:this.props.match.params.boardId,
          
       
       }

     }

  

    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }


    //On mount clear any images in store, fetch the images for the baord Id and then set the board if (these could be combined later)
    componentDidMount() {
     this.props.dispatch(clearImages());
     this.props.fetchImages(this.state.boardId);
     this.props.dispatch(setMoodboardId(this.state.boardId));
    }

     //clears images store object from redux store   
    componentWillUnmount(){
       this.props.clearImages();
       this.props.clearUpdatedImages();
       //check to see if delete mode is enabled if true turn off (this works okay for now )
       if(this.props.editMode){
        // console.log(this.props.editMode);
         this.props.dispatch(editImageMode())
       }
       window.removeEventListener("dragover",(e)=>"");
       window.removeEventListener('resize', this.handleWindowSizeChange);
      // console.log('UNMOUNTING?');
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

    //This function calls the action to update the image coordintes/size in the Redux store
    updateImage =(imageId,xpos,ypos,width,height,rotateAngle)=>{
       // this.props.dispatch(updateImage());
       this.props.dispatch(updateImage(imageId,xpos,ypos,width,height,rotateAngle));
     
      }

     //sets view mode - free,grid or list
    setViewMode=(mode)=>{
      this.setState({ 
        viewMode:mode
      })
    }

    //delete mode toggle
    deleteModeToggle=()=>{
      this.setState({
        deleteMode: !this.state.deleteMode
      })
    }

    //saves images and uploads them to ther server
    saveUploadImages=(imageId=631,xpos,ypos,width,height)=>{
      const updatedImageIdList = this.props.updatedImageIds;
      const images = this.props.allImages;
      //console.log('Saving Images...',updatedImageIdList);
      this.props.saveImages(updatedImageIdList, images);
   }

      //go home
      handleHome=()=>{
        this.props.history.push('/dashboard');
       // console.log('BUTTON TEST HISTORY',this.props.history.location.pathname==='/dashboard');
      }

    
    render(){
      const imagesIds = this.props.imageIds;
      const images =  this.props.allImages;

      const { width } = this.state;
      const isMobile = width <= 500;


      if(!this.props || imagesIds === undefined){
       return  <LoadingScreen loading={this.props.loading}/>
      }
  
      return (
        <div id="board-container">
             <LoadingScreen loading={this.props.loading}/>

              <div id="new_board" className={this.props.imageIds.length === 0 ? "fadeIn" : "fadeOut"} style={this.props.imageIds.length === 0 ? {display:"block"} : {display:"none"}} >
                     <span className="nonmobile"> Drag image files into this browser window to add images to this board. </span>
                     <span className="mobile">Click the upload button to upload images to this board. </span>
              </div>

         
            <div id="board_menu" style={isMobile ? {display:"none"} : {display:"block"}}>
                  <Menubar  editMode={this.props.editMode} viewMode={this.state.viewMode} editImageMode={()=>this.props.editImageMode()} handleHome={()=>this.handleHome()} setViewMode={(mode)=>this.setViewMode(mode)} saveUploadImages={()=>this.saveUploadImages()}/>
            </div>
          
             <section>
                      
                      <Fullscreen  handleHome={()=>this.handleHome()} saveUploadImages={this.saveUploadImages} getImages={()=>this.getImages()} boardId={this.props.match.params.boardId}/>
                    
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

                            return  <DragRect imageId={imageId} key={imageId} image={images[imageId]} dispatcher={(xpos,ypos,width,height,rotateAngle)=>this.updateImage(imageId,xpos,ypos,width,height,rotateAngle)}></DragRect>
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