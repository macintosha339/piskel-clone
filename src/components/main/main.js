import React, { Component } from "react";
import '../../styles/main/main.scss';
import CanvasElement from './canvas/canvas';
import EditList from './editList/editList';
import ColorList from './colorList/colorList';


class Main extends Component {
    constructor(props) {
        super(props);
    }

    state = {
       pixelSize : (localStorage.getItem('pixelSize') || 4),
       imageLoaded: (localStorage.getItem('imageLoaded') || false),
       inputRange: (localStorage.getItem('inputRange') || 0),
       activeTool: (localStorage.getItem('activeTool') || 'pencil'),
    }

    render() {
        return(
        <main className="main">
            <div className="tools_wrapper">
                <EditList/>
                <ColorList/>
            </div>
            <CanvasElement
            activeTool ={this.state.activeTool}
            />  
        </main>
        );
    }

}

export default Main;