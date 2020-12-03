import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class SignNav extends Component {
    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="mail">
                    <Link to="/Login">Signin</Link>
                </Menu.Item>
                <Menu.Item key="app">
                    <Link to="/SignUp">Signup</Link>
                </Menu.Item>
            </Menu>
        );
    }
}
export default SignNav;
