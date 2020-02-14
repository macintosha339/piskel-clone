import React, { PureComponent } from 'react';

class Tool extends PureComponent  {
    render() {
        const {el, handleClick, active} = this.props;
        return (
        <React.Fragment>
            <div onClick={handleClick} className={"item" + ((active) ? " active" : "")}>
                <a href="#"><img src={el.imgPath} alt="bucket" id="bucket"/></a>
            </div>
            <div onClick={handleClick} className={"item" + ((active) ? " active" : "")}>{el.text}</div>
        </React.Fragment>
        );
    }
}
  
  export default Tool;