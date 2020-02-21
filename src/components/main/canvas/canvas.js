import React, { PureComponent } from "react";


class CanvasElement extends PureComponent {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }
    
    lastX = null
    lastY = null
    isDrawing = false
    
    draw = (e) => {
        const context = this.canvas.current.getContext('2d')
        const currentCol = document.getElementById('currentCol')
        const { pixelSize } = this.props

        context.fillStyle = currentCol.style.backgroundColor
        if (!(e.buttons & 1)) {
            this.lastX = this.lastY = null
            return
        }

        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY

        if (this.lastX !== null) {
            this.getLineCoord({ x, y }, { x: this.lastX, y: this.lastY }).forEach(({ x, y }) => {
            context.beginPath()
            context.fillRect(Math.floor(x / pixelSize) * pixelSize, Math.floor(y / pixelSize) * pixelSize, pixelSize, pixelSize)
        })
    }

        this.lastX = x
        this.lastY = y
    }

    getLineCoord (p0, p1) {
        let { x, y } = p0
        const dx = Math.abs(x - p1.x)
        const dy = Math.abs(y - p1.y)
        const sx = (x < p1.x) ? 1 : -1
        const sy = (y < p1.y) ? 1 : -1
        let error = dx - dy
        const coord = []

        while (true) {
        coord.push({ x, y })

        if ((x === p1.x) && (y === p1.y)) {
        break
        }

        const e2 = error * 2
        if (e2 > -dy) {
        error -= dy
        x += sx
        }
        if (e2 < dx) {
        error += dx
        y += sy
        }
    }

        return coord
    }

    mouseMove = (e) => {
        if(this.props.activeTool === 'pencil') this.draw(e);
    }

    hexToRGB = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
    
        return `rgb(${r}, ${g}, ${b})`;
      }

    render() {

        return(
            <div className="canvas_wrapper">
                <div className="loader_tools">
                    <button className="loader-button btn_loader" id="load-image">Load</button>
                    <input className="loader-input" type="text" placeholder="Enter city" id="search-input"/>
                    <button className="black_and_white btn_loader">B&W</button>
                </div>
                <canvas id="canvas" ref = {this.canvas} width={512} height={512}
                onMouseMove = {this.mouseMove}
                ></canvas>
                <input className="switch_size" type="range" defaultValue="0" min="0" max="2"/>
                </div>
        );
    }
}

export default CanvasElement;