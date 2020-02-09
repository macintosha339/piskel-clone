import React, { PureComponent } from "react";
import '../../styles/header/header.scss'
import menu from '../../../public/icons/menu.png'
import shape from '../../../public/icons/Shape.png'

class Header extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {

        return (
        <header className="header">
        <div className="top_app_bar_wrapper">
            <div className="nav_icon_bar_title">
                <div className="nav_icon">
                    <a href="#"><img src={menu} alt="menu" /></a>
                </div>
                <div className="app_title">Piskel Clone</div>
            </div>
            <div className="menu_icon">
                <a href="#"><img src={shape} alt="shape"/></a>
            </div>
        </div>
    </header>
    );
        
    }
}


export default Header;