import "antd/dist/antd.css";

import React, {Component} from 'react';
import '../Main/style.scss'
import RightMenu from './RightMenu'
import {Link} from "react-router-dom"
import {Button, Drawer} from 'antd';
import UserStatus from "../Common/UserStatus";

class Navbarz extends Component {
    state = {
        current: 'mail',
        visible: false,
        callVisible: false
    };
    showModal = () => {
        this.setState({
            callVisible: true
        });
    };

    showDrawer = () => {
        this.setState({
            visible: true,
            name:""
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.name!==this.props.name)
            this.setState({name:this.props.name})
    }
    handleOk = e => {
        e.preventDefault()
        this.setState({
            callVisible: false
        });
    // return  <a href={'/video'}/>
    };

    handleCancel = e => {
        e.preventDefault()
        this.setState({
            callVisible: false
        });
    };
push=()=>{
        this.setState({
            callVisible: false
        });
    };
    render() {
        return (
            <nav className="menuBar">
                <div className="logo">
                    <Link to={'/'}><img src="images/logo.png" alt="image"/> </Link>
                </div>
                <div className="menuCon">
                    <div className="leftMenu">
                        <UserStatus token={this.props.token} id={this.props.id}
                        history={this.props.history}
                        />
                    </div>
                    <div className="rightMenu">
                        <RightMenu name={this.props.name} />
                    </div>
                    <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                        <span className="barsBtn"></span>
                    </Button>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >

                        <RightMenu name={this.state.name} />
                    </Drawer>
                </div>
            </nav>
        );
    }
}

export default Navbarz;