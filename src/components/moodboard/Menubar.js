import React, { Component } from 'react';
import Button from './Button';
import './menubar.css';

export default function Menubar(props) {

    const icons={
        freePath: "../assets/cuetflag.png",
        listPath:"../assets/listicon.png",
        gridPath:"../assets/svg-rounded_grid-512.png",
        deletePath:"../assets/trashcan.png",
        savePath:"../assets/save.png",
        homePath:"../assets/homehappy.jpg"
      }
  
        return(
        <div id="view-options">
           {/* <span> View mode:</span> */}
              <ul>
                 <li>  <Button active={props.viewMode === "free" ? true : false}  iconGraphic={icons.freePath} handleClick={()=>props.setViewMode("free")} /></li>
                 <li>  <Button active={props.viewMode === "list" ? true : false}   iconGraphic={icons.listPath} handleClick={()=>props.setViewMode("list")} /></li>
                 <li>  <Button active={props.viewMode === "grid" ? true : false}  iconGraphic={icons.gridPath} handleClick={()=>props.setViewMode("grid")} /></li>
                 <li>  <Button active={props.editMode}  iconGraphic={icons.deletePath} handleClick={()=>props.editImageMode()} /></li>
                 <li>  <Button iconGraphic={icons.savePath} handleClick={()=>props.saveUploadImages()} /></li>
                 <li>  <Button iconGraphic={icons.homePath} handleClick={()=>props.handleHome()} /></li>
            </ul>
        </div>
        )
    
}