import React from "react";
import "antd/dist/antd.css";
import {Menu} from "antd";
import {AppstoreOutlined, DashboardOutlined, MailOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
    state = {
        current: "mail"
    };

    handleClick = e => {
        console.log("click ", e);
        this.setState({
            current: e.key
        });
    };

    render() {
        return (
            <div className="logo">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"

                >
                    <Menu.Item key="mail" className="ml-5">
                        <DashboardOutlined/>
                        <Link to={'/'}>
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="app">
                        <AppstoreOutlined/>
                        <Link to={'/Bills'}>
                            Bills
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Navbar