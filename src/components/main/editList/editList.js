import React, { PureComponent } from "react";
import Tool from "./tool/tool";
import bucket from '../../../../public/icons/icon-share-bucket.png';
import chooseCol from '../../../../public/icons/icon-upload.png';
import pencil from '../../../../public/icons/pencil.png';
import transform from '../../../../public/icons/icon-share.png';

const tools = [
    {
        id: 'bucket',
        imgPath: bucket,
        text: 'Fill bucket',
    },
    {
        id: 'chooseCol',
        imgPath: chooseCol,
        text: 'Choose color',
    },
    {
        id: 'pencil',
        imgPath: pencil,
        text: 'Pencil',
    },
    {
        id: 'transform',
        imgPath: transform,
        text: 'Transform',
    },
];
class EditList extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const {activeTool, toolSwitcher} = this.props;
        return(
        <div className="edit_list" >
            {tools.map((el, idx) => <Tool
            active={activeTool === el.id}
            handleClick={toolSwitcher.bind(this, el.id)}
            el={el}
            key={idx}
            />)
            }
        </div>
        );
    }
}

export default EditList;