import React, { PureComponent } from "react";

class ColorList extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="color_list">
                    <div className="item circle" id="currentCol">
                        <input type="color" id="input_color" name="head" defaultValue="#с4с4с4"/>
                    </div>
                    <div className="item">Current color</div>
                    <div className="item circle" id="prevCol"></div>
                    <div className="item">Prev Color</div>
                    <div className="item circle" id="red"></div>
                    <div className="item">red</div>
                    <div className="item circle" id="blue"></div>
                    <div className="item">blue</div>
            </div>
        );
    }
}

export default ColorList;