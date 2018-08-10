import React, { Component } from 'react';

export default class Dropdown extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  render() {
    return (
      <div id="dropdown">
        <button onClick={this.showMenu}>
          Show menu
        </button>
        
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
              <ul>
                <li><button onClick={()=>this.props.saveUploadImages()}> Save</button></li>
                <li> <button > Dashboard </button></li>
                <li><button onClick={()=>this.props.setViewMode("grid")}> Grid Mode </button></li>
              </ul>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}