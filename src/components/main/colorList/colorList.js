import React, { PureComponent } from "react";
import Color from "./color/color";

const colors = [
    {
        id: 'prevCol',
        text: 'Prev Color',
    },
    {
        id: 'red',
        text: 'red',
    },
    {
        id: 'blue',
        text: 'blue',
    },
];
class ColorList extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {currentCol, colorSwitcher} = this.props
        return(
            <div className="color_list">
                    <div className="item circle" id="currentCol" style={{backgroundColor: currentCol}}>
                        <input type="color" id="input_color" name="head" defaultValue={currentCol}
                        onInput={colorSwitcher.bind(this)}/>
                    </div>
                    <div className="item">Current color</div>
                    {colors.map((el, idx) => <Color
                    key={idx}
                    el={el}
                    />)}
            </div>
        );
    }
}

export default ColorList;