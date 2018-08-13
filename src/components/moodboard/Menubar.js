import React, { Component } from 'react';
import Button from './Button';
import './menubar.css';

export default class Menubar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          icons:{
            freePath: "../assets/cuetflag.png",
            listPath:"../assets/listicon.png",
            gridPath:"../assets/svg-rounded_grid-512.png",
            deletePath:"../assets/trashcan.png",
            savePath:"../assets/save.png",
            homePath:"../assets/homehappy.jpg"
          }
        };
       
      }
    
    render(){

     

        return(
        <div id="view-options">
           {/* <span> View mode:</span> */}
              <ul>
                 <li>  <Button active={this.props.viewMode === "free" ? true : false}  iconGraphic={this.state.icons.freePath} handleClick={()=>this.props.setViewMode("free")} /></li>
                 <li>  <Button active={this.props.viewMode === "list" ? true : false}   iconGraphic={this.state.icons.listPath} handleClick={()=>this.props.setViewMode("list")} /></li>
                 <li>  <Button active={this.props.viewMode === "grid" ? true : false}  iconGraphic={this.state.icons.gridPath} handleClick={()=>this.props.setViewMode("grid")} /></li>
                 <li>  <Button iconGraphic={this.state.icons.deletePath} handleClick={()=>this.props.editImageMode('delete')} /></li>
                 <li>  <Button iconGraphic={this.state.icons.savePath} handleClick={()=>this.props.saveUploadImages()} /></li>
                 <li>  <Button iconGraphic={this.state.icons.homePath} handleClick={()=>this.props.handleHome()} /></li>
            </ul>
        </div>
        )
    }
}