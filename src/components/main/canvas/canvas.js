import React, { PureComponent } from "react";

class CanvasElement extends PureComponent {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }
    
    lastX = null
    lastY = null
    isDrawing = false
    async componentDidUpdate() {
      const searchBox = document.getElementById('search-input')
        const url = `https://api.unsplash.com/photos/random?query=town,${searchBox.value}&client_id=4260b98af2fe2d5b6a1bee5c8121112d7b668ea44c6bc156214ca4d45c70f5f9`;
        try {
          const res = await fetch(url)
          const data = await res.json()
          const urlAdress = data.urls.small
          console.log(urlAdress)
          const image = new Image()
          image.crossOrigin = 'annonymous'
          image.src = urlAdress
          const context = this.canvas.getContext('2d')
          context.imageSmoothingEnabled = false
          context.webkitImageSmoothingEnabled = false
          image.onload = () => {
            const xImg = canvas.width - image.width === 0
            ? 0
            : Math.floor(Math.abs(canvas.width - image.width) / 2);
          const yImg = canvas.height - image.height === 0
            ? 0
            : Math.floor(Math.abs(canvas.height - image.height) / 2);
            if (image.width <= canvas.width && image.height <= canvas.height) {
              context.drawImage(image, xImg, yImg, image.width, image.height);
            } else if (image.width > canvas.width) {
              context.drawImage(image, 0, yImg, canvas.width, canvas.height);
            } else if (image.height > canvas.height) {
              context.drawImage(image, xImg, 0, image.width, canvas.height);
            } else {
              context.drawImage(image, 0, 0, canvas.width, canvas.height);
            }
            localStorage.setItem('curImage', canvas.toDataURL())
            let imageStateLoaded = true
          localStorage.setItem('imageStateLoaded', imageStateLoaded)
          }
          
        } catch (error) {
          alert(error)
        }
          // .then(res => res.json())
          // .then(data => { 
          //   ctx.drawImage(data.urls.small, 0, 0); 
          // });
    }
    
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

      getPixelColor = (e) => {
        const x = e.nativeEvent.offsetX === undefined ? e.nativeEvent.layerX : e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY === undefined ? e.nativeEvent.layerY : e.nativeEvent.offsetY
        const context = this.canvas.current.getContext('2d')
        const p = context.getImageData(x, y, 1, 1).data
        prevCol.style.backgroundColor = window.getComputedStyle(currentCol, null).getPropertyValue('background-color')
        currentCol.style.backgroundColor = `rgb(${p[0]}, ${p[1]}, ${p[2]})`
      }

      handleClick = (e) => {
          if(this.props.activeTool === 'chooseCol') this.getPixelColor(e)
      }
      
      

    render() {

        return(
            <div className="canvas_wrapper">
                <div className="loader_tools">
                    <button className="loader-button btn_loader" id="load-image" onClick = {this.componentDidUpdate}>Load</button>
                    <input className="loader-input" type="text" placeholder="Enter city" id="search-input"/>
                    <button className="black_and_white btn_loader">B&W</button>
                </div>
                <canvas id="canvas" ref = {this.canvas} width={512} height={512}
                onMouseMove = {this.mouseMove}
                onClick={this.handleClick}
                ></canvas>
                <input className="switch_size" type="range" defaultValue="0" min="0" max="2"/>
                </div>
        );
    }
}

export default CanvasElement;