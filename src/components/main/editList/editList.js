import React, { PureComponent } from "react";
import Tool from "./tool/tool";

const tools = [
    {
        id: 'bucket',
        imgPath: '../../../../public/icons/icon-share-bucket.png',
        text: 'Fill bucket',
    },
    {
        id: 'chooseCol',
        imgPath: '../../../../public/icons/icon-upload.png',
        text: 'Choose color',
    },
    {
        id: 'pencil',
        imgPath: '../../../../public/icons/pencil.png',
        text: 'Pencil',
    },
    {
        id: 'transform',
        imgPath: '../../../../public/icons/icon-share.png',
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