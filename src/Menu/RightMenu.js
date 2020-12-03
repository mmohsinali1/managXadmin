import React, {Component} from 'react';
import {Avatar, Menu} from 'antd';
import {Link, Redirect} from 'react-router-dom'

const SubMenu = Menu.SubMenu;


class RightMenu extends Component {
    constructor(props) {
        super(props);
        let loggedIn = true;
        this.state = {
            loggedIn,
            name:this.props.name
        };


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.name!==this.props.name)
            this.setState({name:this.props.name})
    }

    remove = () => {
        this.setState({
            loggedIn:false
        })

    };

    render() {

        const {loggedIn, name} = this.state
        if (!loggedIn)
            return <Redirect to='/logout'/>;
        return (
            <Menu mode="horizontal">
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            <div className="customer-name">
                                {name}
                                <br/><a href="javascript:void(0)">View Profile</a>
                    </div>


            </span>
                    }
                >
                    <Menu.ItemGroup>
                        <Menu.Item key="setting:1">
                            <Link to={'/EditProfile'}> Edit Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="setting:2">
                            <a onClick={this.remove}> LogOut</a>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        );
    }
}

export default RightMenu;