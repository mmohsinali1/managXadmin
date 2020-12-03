import React from "react";
import ReactDOM from "react-dom";
import {Link, HashRouter} from "react-router-dom"
import "antd/dist/antd.css";
import "../index.css";
import {Layout, Menu} from "antd";
import {
  PayCircleOutlined,
    WalletOutlined,
    UserAddOutlined,
    ProfileOutlined,
UsergroupAddOutlined,
   ReconciliationOutlined
} from "@ant-design/icons";
import PrivateRoutes from "../Routes/PrivateRoutes";
import cookie from "react-cookies";

const {Header, Sider, Content,Footer} = Layout;
const {SubMenu} = Menu;

class MainLayOut extends React.Component {

    onCollapse = collapsed => {

        this.setState({collapsed});
    };

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            collapsed: false,
            key: "/",
            calling:false,
            called:false,
            users:{
                read:false,
                write:false
            },payments:{
                read:false,
                write:false
            },quotations:{
                read:false,
                write:false
            },discounts:{
                read:false,
                write:false
            },
            customers:{
                read:false,
                write:false
            },
            resourceAssignment:false
        }
    }

    setKey = key => {
        this.setState({
            key: key
        })
    }
    setToken = token => {
        this.setState({
            token: token,
            calling:true
        });
        if(token==="")
            this.setState({
                calling:false
            })

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    setPermissions=(users,customers,quotations,discounts,payments,resourceAssignment)=>{
        this.setState({
            users:users,customers:customers,quotations:quotations,
            discounts:discounts,payments:payments,resourceAssignment:resourceAssignment
            ,called:true
        })

    }

    render() {
        const {token,users,customers,quotations,discounts,payments,resourceAssignment} = this.state;
        let{key}=this.state;
        return (token ? <Layout>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <HashRouter>
                            <Menu className="mt-5" theme="dark" mode="inline" selectedKeys={[key]}>
                                    <Menu.Item key="/">
                                        <ProfileOutlined onClick={()=>this.props.history.push('/')}  style={{fontSize: '36px', color: '#a8c438'}}/>
                                        <span style={{fontSize: '16px', color: '#a8c438'}}>
                                <Link to={'/'}> Projects
                                </Link>
                            </span>
                                    </Menu.Item>
                                {users['read']?
                                    <Menu.Item key="/Users">
                                    <UserAddOutlined onClick={()=>this.props.history.push('/Users')} style={{ fontSize: '36px', color: '#a8c438' }} />
                                    <span>
                                 <Link to={'/Users'}> Users
                            </Link>
                            </span>

                                </Menu.Item>:null}
                                {customers['read']?
                                    <Menu.Item key="/Customers">
                                    <UsergroupAddOutlined onClick={()=>this.props.history.push('/Customers')} style={{fontSize: '36px', color: '#a8c438'}}/>
                                    <span>
                                <Link to={'/Customers'}> Customers
                            </Link>
                            </span>
                                </Menu.Item>:null
                                }
                                {payments['read']?
                                    <Menu.Item key="/Payments">
                                    <WalletOutlined onClick={()=>this.props.history.push('/Payments')} style={{fontSize: '36px', color: '#a8c438'}}/>
                                    <span>
                                  <Link to={'/Payments'}> Payments
                            </Link>
                            </span>
                                </Menu.Item>:null
                                }
                                {discounts['read']?
                                <Menu.Item key="/Discounts">
                                    <PayCircleOutlined onClick={()=>this.props.history.push('/Discounts')} style={{fontSize: '36px', color: '#a8c438'}}/>
                                    <span>
                                        <Link to={'/Discounts'}> Discounts
                                    </Link>
                                    </span>
                                </Menu.Item>:null
                            }
                            {quotations['read']?
                                <Menu.Item key="/Quotations">
                                    <ReconciliationOutlined onClick={()=>this.props.history.push('/Quotations')} style={{fontSize: '36px', color: '#a8c438'}}/>
                                    <span>
                                         <Link to={'/Quotations'}> Quotations
                                    </Link>
                                    </span>
                                </Menu.Item>:null
                            }
                                {resourceAssignment?
                                    <Menu.Item key="/Resource">
                                        <ReconciliationOutlined style={{fontSize: '36px', color: '#a8c438'}}/>
                                        <span>
                                         <Link to={'/Resource'}> Resource Assignment
                                    </Link>
                                    </span>
                                    </Menu.Item>:null
                                }
                            </Menu>
                        </HashRouter>
                    </Sider>

                    <Layout className="site-layout">
                    <Content
                            className="site-layout-background"
                            style={{
                                //margin: "24px 16px",
                                padding: 0,
                                minHeight: 980
                            }}

                        >
                            <PrivateRoutes token={this.state.token} setToken={this.setToken}
                                           setKey={this.setKey} setPermissions={this.setPermissions}
                                           calling={this.state.calling}
                                           history={this.props.history}
                            />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>CopyRights © Vaporvm.com 2020</Footer>
                    </Layout>
                </Layout> :
                <PrivateRoutes token={this.state.token} setToken={this.setToken} setKey={this.setKey}
                               setPermissions={this.setPermissions}
                               calling={this.state.calling}
                />
        )
    }

}

export default MainLayOut;
