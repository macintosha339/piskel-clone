import React, { PureComponent } from 'react';

class Color extends PureComponent  {
    render() {
        const { el } = this.props;
        return (
            <React.Fragment>
                <div className="item circle" id={el.id}></div>
                <div className="item">{el.text}</div>
            </React.Fragment>
        );
    }
}
  
  export default Color;