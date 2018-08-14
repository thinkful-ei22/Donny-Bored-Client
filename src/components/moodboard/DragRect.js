import React, { Component } from 'react'
import ResizableRect from './ResizableRect'
//import { url } from 'inspector';

export default class DragRect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.image.dimensions[0],
      height: this.props.image.dimensions[1],
      top: this.props.image.position[1],
      left: this.props.image.position[0],
      rotateAngle: 0
    }
  }

  handleResize = (style, isShiftKey, type) => {
    // type is a string and it shows which resize-handler you clicked
    // e.g. if you clicked top-right handler, then type is 'tr'
    let { top, left, width, height } = style
    top = Math.round(top)
    left = Math.round(left)
    width = Math.round(width)
    height = Math.round(height)
    this.props.dispatcher(left,top,width,height);
    // this.setState({
    //   top,
    //   left,
    //   width,
    //   height
    // })
  }

  handleResizeEnd =()=>{

    const {width, top, left, height, rotateAngle} = this.state
  //  this.props.dispatcher(left,top,width,height);
    console.log('RESIZE END',width,top,left,height);

  }

  handleRotate = (rotateAngle) => {
    this.setState({
      rotateAngle
    })
  }

  handleDrag = (deltaX, deltaY) => {
   //this.props.dispatcher();
    // console.log('DRAGGING IMAGE RECT');
     const positions = this.props.image.position;
     const dimensions = this.props.image.dimensions;
     this.props.dispatcher( positions[0] + deltaX,positions[1] + deltaY,dimensions[0],dimensions[1]);
    // this.setState({
    //   left: this.state.left + deltaX,
    //   top: this.state.top + deltaY
    // })
  }


  handleDragEnd =() =>{
    const {width, top, left, height, rotateAngle} = this.state
      //this.props.dispatcher(left,top,width,height);
      console.log('DRAG END',width,top,left,height);

  }


  render() {
    const {width, top, left, height, rotateAngle} = this.state
    const positions = this.props.image.position;
    const dimensions = this.props.image.dimensions;

    if(!this.props == undefined){
      return null; 
    }
   // console.log('statelog',this.state);
    return (
      <div className="App" >
      
        <ResizableRect
          left={positions[0]}
          top={positions[1]}
          width={dimensions[0]}
          height={dimensions[1]}
          rotateAngle={rotateAngle}
          // aspectRatio={false}
          // minWidth={10}
          // minHeight={10}
          zoomable='n, w, s, e, nw, ne, se, sw'
          // rotatable={true}
          // onRotateStart={this.handleRotateStart}
          onRotate={this.handleRotate}
          // onRotateEnd={this.handleRotateEnd}
          // onResizeStart={this.handleResizeStart}
          onResize={this.handleResize}
         // onResizeEnd={this.handleResizeEnd}
          // onResizeEnd={this.handleUp}
          // onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
       //   onDragEnd={this.handleDragEnd}
          imageId={this.props.imageId}
          //image={this.props.image}
        >
        </ResizableRect>
      </div>
    )
  }
}
