import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import requiresLogin from '../home/Requires-login';
import DragRect from './DragRect';
import {fetchImages, updateImage,clearImages, clearUpdatedImages} from '../../actions/images';
import {setMoodboardId} from '../../actions/moodboards';
import {API_BASE_URL} from '../../config.js'
import Fullscreen from './Fullscreen';
import Menubar from './Menubar';
import './board.css';
import './view-grid.css';




export class Board extends React.Component {

     constructor(props){
       super(props);
       this.state={
          viewMode: "free",
          zoomOut:{transform:'scale(0.5)'},
          zoomIn:{transform:'scale(2)'},
          scaleFactor:{transform:'scale(1)'},
       
       }

     }

    //LIFE CYCLE
    componentDidMount() {
     this.props.fetchImages(this.props.match.params.boardId);
     this.props.dispatch(setMoodboardId(this.props.match.params.boardId));
     console.log('PROPS MATCH PARMAS',this.props);
     console.log('BOARD TEST HISTORY',this.props.history);
     //console.log('what is it', this.props);  
     // .then(([data]) => this.props.state.setState({ moodboardImages :data.images}));
    }

     //clears images store object from redux store   
    componentWillUnmount(){
       this.props.clearImages();
       window.removeEventListener("dragenter", e => console.log('removed dragenter listner'));
       window.removeEventListener("dragleave", e => console.log('removed drageleavelistner'));
       window.removeEventListener("dragover", e => console.log('removed drageleavelistner'));
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


    setViewMode=(mode)=>{
      this.setState({ 
        viewMode:mode
      })
    }


    saveUploadImages(imageId=631,xpos,ypos,width,height){
       
      console.log('Saving Images...');
     // const updateImages = this.props.allImages;
      const updatedImageIdList = this.props.updatedImageIds;
      let length =  updatedImageIdList.length;
      let uniqueIDList = [];
      let seen = new Set();
     
      outer: 
      for (let index = 0; index < length; index++) {
        let value = updatedImageIdList[index];
        if (seen.has(value)) continue outer;
        seen.add(value);
        uniqueIDList.push(value);
      }

      const updaters=uniqueIDList.map(id => {
        //using fetch insead of Axios library
        console.log('SAVING IMAGES...');
       return fetch(`${API_BASE_URL}/api/images/${id}`,{
          method:'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
           body: JSON.stringify(this.props.allImages[id])
        })
        .then(response => console.log(response) );
      
      
      }); 
      //console.log('ToBeUpdated',updateObjectArray);
      // Once all the files are uploaded 
      Promise
        .all(updaters)
        .then(() => {
          //this.props.dispatch(fetchImages());
          this.props.dispatch(clearUpdatedImages());
          console.log('UPDATED MOODBOARD' + this.props.allImages);
      });
   }


      handleHome = () => {
        this.props.history.push('/dashboard');
        console.log('BUTTON TEST HISTORY',this.props.history.location.pathname==='/dashboard');
      }


    render() {
      const imagesIds = this.props.imageIds;
      const images =  this.props.allImages;

      if(!this.props || imagesIds == undefined){
        return null; //You can change here to put a customized loading spinner 
      }
  
      return (
        <div id="board-container">
              <div id="board_menu">
                  <Menubar handleHome={()=>this.handleHome()} setViewMode={(mode)=>this.setViewMode(mode)} saveUploadImages={()=>this.saveUploadImages()}/>
              </div>
                <section>
                       {/* <div>
                         <button onClick={()=> this.saveUploadImages()}>Save IMAGES</button>
                      </div> */}
                      <Fullscreen getImages={()=>this.getImages()} boardId={this.props.match.params.boardId}/>
              
                  <aside style={this.state.scaleFactor}>
                  
                    <ul id={this.state.viewMode}>
                
                    {
                      this.props.imageIds.map(imageId =>{
                        // const index =  this.props.moodboardImages.indexOf(image);
                       
                          if(this.state.viewMode === "list"){
                            return <li key={imageId}><img src={images[imageId].imageurl} /></li>
                          } 

                          else if(this.state.viewMode ==="grid"){
                            return <li className="grid_block" key={imageId}><img src={images[imageId].imageurl} /></li>
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
    updatedImageIds: state.images.updatedImageIds

});

const mapDispatchToProps = dispatch => {
  return {
    fetchImages: (id) =>dispatch(fetchImages(id)),
    clearImages:() => dispatch(clearImages())
  }
}

export default requiresLogin()(connect(mapStateToProps,mapDispatchToProps)(Board));