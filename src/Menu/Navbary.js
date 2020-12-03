import '../Main/style.scss'

import React, {Component} from 'react';
import "antd/dist/antd.css";
import Signin from './Signin'
import {Link} from "react-router-dom"
import {Button, Drawer} from 'antd';


class Navbarz extends Component {
    state = {
        current: 'mail',
        visible: false,
        collapsed:this.props.collapsed
    };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };


    render() {

        return (

            <nav className="menuBar">

                <div className="logo">
                    <Link to={'/Main'}><img src="images/logo.png" alt="image"/> </Link>
                </div>
                <div className="menuCon">
                    <div className="leftMenu">
                        {null}
                    </div>
                    <div className="rightMenu">
                       <Signin/>
                    </div>
                    <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                        <span className="barsBtn"></span>
                    </Button>
                    <Drawer
                        title="Basic Drawer"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >

                        <Signin/>
                    </Drawer>
                </div>
            </nav>
        );
    }
}

export default Navbarz;