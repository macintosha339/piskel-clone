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

    state  = {
       pixelSize : (+localStorage.getItem('pixelSize') || 4),
       imageLoaded: (localStorage.getItem('imageLoaded') || false),
       inputRange: (+localStorage.getItem('inputRange') || 0),
       activeTool: (localStorage.getItem('activeTool') || 'pencil'),
       currenCol: '#2320c9',
       prevCol: '#41F795'
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
            this.swapCurrentWithPrevColors();
            this.setState({ currenCol, prevCol });
        }
    }
    curColorChanger = (e, isRGB = false) => {
        if (isRGB) {
            this.setState({ currenCol: e });
        } else {
            const currenCol = window.getComputedStyle(e.target, null).getPropertyValue('background-color');
            this.swapCurrentWithPrevColors();
            this.setState({ currenCol, prevCol });
        }
    }
    swapCurrentWithPrevColors = () => {
        const prevElem = document.getElementById('prevCol')
        let prevCol = this.state.currenCol
        prevElem.style.backgroundColor = prevCol
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
                curColorChanger={this.curColorChanger}
                />
            </div>
            <CanvasElement
            ref={this.canvasComponent}
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