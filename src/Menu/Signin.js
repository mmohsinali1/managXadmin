import React, {Component} from 'react';
import {Menu} from 'antd';
import {Link} from "react-router-dom";

class Signin extends Component {
    render() {
        return (
            <Menu mode="horizontal">
                <Menu mode="horizontal">
                    <Menu.Item key="mail">
                        <Link to={'/'}>Login</Link>
                    </Menu.Item>
                    <Menu.Item key="app">
                        <Link  to={'/forget'}>Forgot Password?</Link>
                    </Menu.Item>
                </Menu>
            </Menu>
        );
    }
}

export default Signin;