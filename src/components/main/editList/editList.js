import React, { PureComponent } from "react";
import bucket from '../../../../public/icons/icon-share-bucket.png';
import choose from '../../../../public/icons/icon-upload.png';
import colorPencil from '../../../../public/icons/pencil.png';
import transform from '../../../../public/icons/icon-share.png';

class EditList extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="edit_list">
                    <div className="item">
                        <a href="#"><img src={bucket} alt="bucket" id="bucket"/></a>
                    </div>
                    <div className="item">Fill bucket</div>
                    <div className="item">
                        <a href="#"><img src={choose} alt="choose color" id="chooseCol"/></a>
                    </div>
                    <div className="item">Choose color</div>
                    <div className="item">
                        <a href="#"><img src={colorPencil} alt="pencil" id="pencil"/></a>
                    </div>
                    <div className="item">Pencil</div>
                    <div className="item">
                        <a href="#"><img src={transform} alt="transform"/></a>
                    </div>
                    <div className="item">Transform</div>
                </div>
        );
    }
}

export default EditList;