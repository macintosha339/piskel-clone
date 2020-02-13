import React, { PureComponent } from "react";


class CanvasElement extends PureComponent {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }
    
    lastX = null
    lastY = null
    
    draw = (e) => {
        const context = this.canvas.current.getContext('2d')
        const { pixelSize } = this.props
        const cordX = e.offsetX === undefined ? Math.round(e.layerX / pixelSize)
        : Math.round(e.offsetX / pixelSize)
        const cordY = e.offsetY === undefined ? Math.round(e.layerY / pixelSize)
        : Math.round(e.offsetY / pixelSize)

        context.fillStyle = window.getComputedStyle(currentCol, null).getPropertyValue('background-color')
        if (!(e.buttons & 1)) {
            this.lastX = this.lastY = null
            return
        }

        const x = e.offsetX
        const y = e.offsetY

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