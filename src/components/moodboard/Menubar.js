import React, { Component } from 'react';
import Dropdown from './Dropdown';
import './menubar.css';

export default class Menubar extends Component {

    render(){

        // return <Dropdown setViewMode={this.props.setViewMode} saveUploadImages={this.props.saveUploadImages}/>
        return(<div id="view-options">
           <span> View mode:</span>
           <ul>
            <li> <button onClick={()=>this.props.setViewMode("list")}><img src="../assets/listicon.png"/></button></li>
            <li>  <button onClick={()=>this.props.setViewMode("free")}><img src="../assets/cuetflag.png"/></button></li>
            <li>  <button onClick={()=>this.props.setViewMode("grid")}><img src="../assets/svg-rounded_grid-512.png"/></button></li>
            </ul>
        </div>
        )

    }


}