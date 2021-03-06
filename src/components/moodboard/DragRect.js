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
      rotateAngle: this.props.image.dimensions[2]
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
    this.setState({
      top,
      left,
      width,
      height
    })
  }

  handleResizeEnd =()=>{

    const {width, top, left, height, rotateAngle} = this.state
    this.props.dispatcher(left,top,width,height,rotateAngle);
    console.log('RESIZE END',width,top,left,height);

  }


  handleRotateEnd=()=>{
    const {width, top, left, height, rotateAngle} = this.state
    this.props.dispatcher(left,top,width,height,rotateAngle);
    console.log('Rotate END',width,top,left,height,rotateAngle);

  }

  handleRotate = (rotateAngle) => {
    this.setState({
      rotateAngle
    })
  }

  handleDrag = (deltaX, deltaY) => {
   //this.props.dispatcher();
   //  console.log('DRAGGING IMAGE RECT')
    this.setState({
      left: this.state.left + deltaX,
      top: this.state.top + deltaY
    })
  }


  handleDragEnd =() =>{
    const {width, top, left, height, rotateAngle} = this.state
      this.props.dispatcher(left,top,width,height,rotateAngle);
      console.log('DRAG END',width,top,left,height);

  }


  render() {
    const {width, top, left, height, rotateAngle} = this.state
    // console.log('rotateer angle',this.props.image.position[2])
    if(!this.props === undefined){
      return null; 
    }
   // console.log('statelog',this.state);
    return (
      <div className="resizable-draggable" aria-grabbed="true" >
      
        <ResizableRect
          left={left}
          top={top}
          width={width}
          height={height}
          rotateAngle={rotateAngle}
          // aspectRatio={false}
          // minWidth={10}
          // minHeight={10}
          zoomable='n, w, s, e, nw, ne, se, sw'
          // rotatable={true}
          // onRotateStart={this.handleRotateStart}
          onRotate={this.handleRotate}
          onRotateEnd={this.handleRotateEnd}
          // onResizeStart={this.handleResizeStart}
          onResize={this.handleResize}
          onResizeEnd={this.handleResizeEnd}
        
          // onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onDragEnd={this.handleDragEnd}
          imageId={this.props.imageId}
          //image={this.props.image}
        >
        </ResizableRect>
      </div>
    )
  }
}
