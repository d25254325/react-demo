import React from 'react'
import { Component } from 'react'

class App extends component {
    componentWillMount(){
        this.props.loadUserFromtoken();
    }
    render() {
        return (
        <div>
            {this.props.children}
        </div>
        );
    }
}

export default component