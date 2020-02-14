import React, { Component } from "react";
import '../../styles/main/main.scss';
import CanvasElement from './canvas/canvas';
import EditList from './editList/editList';
import ColorList from './colorList/colorList';


class Main extends Component {
    constructor(props) {
        super(props);
        this.canvasComponent = React.createRef();
    }

    state = {
       pixelSize : (+localStorage.getItem('pixelSize') || 4),
       imageLoaded: (localStorage.getItem('imageLoaded') || false),
       inputRange: (+localStorage.getItem('inputRange') || 0),
       activeTool: (localStorage.getItem('activeTool') || 'pencil'),
       currenCol: '#с4с4с4',
    }

    toolSwitcher = (activeTool) => {
        this.setState({ activeTool });
    }

    sizeSwitcher = (pixelSize) => {
        this.setState({ pixelSize });
    }

    colorSwitcher = (e, isRGB = false) => {
        if (isRGB) {
            this.setState({ currenCol: e });
        } else {
            const currenCol = this.canvasComponent.current.hexToRGB(e.target.value);
            this.setState({ currenCol });
        }
    }
    render() {
        return(
        <main className="main">
            <div className="tools_wrapper">
                <EditList
                activeTool={this.state.activeTool}
                toolSwitcher={this.toolSwitcher}
                />
                <ColorList
                currenCol={this.state.currenCol}
                colorSwitcher={this.colorSwitcher}
                />
            </div>
            <CanvasElement
            activeTool ={this.state.activeTool}
            pixelSize={this.state.pixelSize}
            sizeSwitcher={this.sizeSwitcher}
            inputRange={this.state.inputRange}
            currenCol={this.state.currenCol}
            />  
        </main>
        );
    }

}

export default Main;