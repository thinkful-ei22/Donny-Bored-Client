import React, { Component } from 'react'
export default function ImageHOC(WrappedComponent) {
    return class extends Component {
        state = {
            username: 'ovrsea',
        };

        render() {
            return <WrappedComponent username={this.state.username} {...this.props} />;
        }
    };
}