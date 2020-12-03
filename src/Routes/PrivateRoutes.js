import React, {Component} from 'react'
import cookie from "react-cookies";
import Bill from '../Bills/Bill'
import Users from '../User/User'
import Payments from '../Payments/Payment'
import Discounts from '../Discount/Discount'
import Navbarz from '../Menu/Navbarz'
import 'antd/dist/antd.css'
import '../Main/style.scss'
import Navbary from '../Menu/Navbary'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Login from "../Auth/Login";
import Main from '../Main/Main'
import EmailVerified from "../Auth/EmailVerified";
import Logout from "../Auth/Logout";
import Forget from "../Auth/Forget";
import Message from '../Auth/Message'
import Reset from "../Auth/Reset";
import ResetLink from '../Auth/ResetLink';
import PresaleServices from "../Services/Api/Api";
import EditProfile from "../Common/EditProfile";
import Customers from "../Customer/Customer";
import AddCustomer from "../Customer/AddCustomer";
import EditCustomer from "../Customer/EditCustomer";
import AddUser from "../User/AddUser";
import EditUser from "../User/EditUser";
import ResourceAssignment from "../Common/ResourceAssignment";
import EditQuotation from '../Bills/EditQuotation'
import AddProject from "../Common/AddProject";
import NotFound from '../Common/NotFound'
import {message} from "antd";
import axios from "axios";

class PrivateRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: cookie.load("admin_token"),
            name: "",
            id: -1,
            company_name: "VaporVM",
            location: "",

            permissions: [],
            users: {
                read: false,
                write: false
            }, payments: {
                read: false,
                write: false
            }, quotations: {
                read: false,
                write: false
            }, discounts: {
                read: false,
                write: false
            },
            customers: {
                read: false,
                write: false
            },
            projects: {
                read: false,
                write: false
            },
            permissionsSet: false,

            resourceAssign: false
        }
        this.props.setToken(this.state.token)

    }

    setPermissions = () => {
        let users = [], payments = [], quotations = [], discounts = [], customers = [], resourceAssign = false,
            projects = []
        this.state.permissions.forEach(e => {
            if (e.includes("users")) {
                if (e.includes("create")) {
                    users['read'] = true
                    users['write'] = true
                } else {
                    users['read'] = true
                    users['write'] = false
                }
            }
            if (e.includes("payments")) {
                if (e.includes("create")) {
                    payments['read'] = true
                    payments['write'] = true
                } else {
                    payments['read'] = true
                    payments['write'] = false
                }
            }
            if (e.includes("quotations")) {
                if (e.includes("create")) {
                    quotations['read'] = true
                    quotations['write'] = true
                } else {
                    quotations['read'] = true
                    quotations['write'] = false
                }
            }
            if (e.includes("discounts")) {
                if (e.includes("create")) {
                    discounts['read'] = true
                    discounts['write'] = true
                } else {
                    discounts['read'] = true
                    discounts['write'] = false
                }
            }
            if (e.includes("customers")) {
                if (e.includes("create")) {
                    customers['read'] = true
                    customers['write'] = true
                } else {
                    customers['read'] = true
                    customers['write'] = false
                }
            }
            if (e.includes("projects")) {
                if (e.includes("create")) {
                    projects['read'] = true
                    projects['write'] = true
                } else {
                    projects['read'] = true
                    projects['write'] = false
                }
            }
            if (e.includes("resource-assignment")) {
                resourceAssign = true
            }

        })
        this.setState({

            users: users,
            payments: payments,
            quotations: quotations,
            discounts: discounts,
            customers: customers,
            resourceAssign: resourceAssign,
            projects: projects,
            permissionsSet: true
        }, () => {
            this.props.setPermissions(this.state.users, this.state.customers, this.state.quotations,
                this.state.discounts, this.state.payments, this.state.resourceAssign
            )
        })
    }
    setToken = token => {

        this.setState({
            token: token,
        });
        if (token === "") {
            this.setState({
                name: "",
                company_name: ""
            })
        }
        this.props.setToken(token)
    }
    setName = name => {

        this.setState({
            name: name,
        });

    }

    setLocation = location => {

        this.setState({
            location: location
        });
        this.props.setKey(location)

    }

    componentWillMount() {
        if (this.state.token !== ""&&this.state.token !==undefined)
            PresaleServices.getName().then(res => {
                    this.setState({
                            name: res.name,
                            permissions: res.permissions,
                            id: res.id
                        }

                        , () => {
                            const api = {
                                Authorization: "Bearer " + this.state.token
                            }

                            axios.put('/api/user/' + res.id + '/online', null, {headers: api});
                            if (this.state.permissions.length === 0) {
                                message.error('you do not have enough rights')

                            } else
                                this.setPermissions();
                        })

                }
            ).catch(() => {
                cookie.remove("admin_token", {
                    path: "/",
                });

                this.setToken("")
                this.props.setToken("")
                this.props.history.push('/Login')
            });
    }

    setLocation = location => {

        this.setState({
            location: location
        });
        this.props.setKey(location);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.token !== "" && this.state.token !== prevState.token && this.props.calling !== true) {
            PresaleServices.getName().then(res => {
                    const api = {
                        Authorization: "Bearer " + this.state.token
                    }
                    axios.put('/api/user/' + res.id + '/online', null, {headers: api});
                    this.setState({
                            name: res.name,
                            permissions: res.permissions,
                            id: res.id
                        }
                    )
                    this.setPermissions();

                }
            ).catch(() => {
                cookie.remove("admin_token", {
                    path: "/",
                });
                this.setToken("")

                this.props.setToken("")
                this.props.history.push('/Login')
            });
        }
    }

    render() {

        window.scrollTo(0, 0)
        let {
            token, name, location, users, customers, quotations, discounts, projects,
            payments, resourceAssign
        } = this.state;

        if (token === undefined)
            token = "";

        let condition = token !== undefined && token !== "" &&
            (!this.state.permissionsSet || this.state.permissions.length !== 0);
        return condition ?
            <HashRouter>
                <Navbarz name={name} location={location} token={this.state.token} history={this.props.history}
                         id={this.state.id}
                />
                <div>
                    <Switch>


                        />
                        <Route path={'//'} render={(props) => <Main{...props}
                                                                                       name={this.state.name}
                                                                                       company_name={this.state.company_name}
                                                                                       setLocation={this.setLocation}
                                                                                       canWrite={resourceAssign}
                                                                                       token={this.state.token}
                                                                                       canCreateProject={this.state
                                                                                           .projects['write']}
                        />}/>
                        <Route path={'/Login'} render={(props) => <Main{...props}
                                                                       name={this.state.name}
                                                                       company_name={this.state.company_name}
                                                                       setLocation={this.setLocation}
                                                                       canWrite={resourceAssign}
                                                                       token={this.state.token}
                                                                       canCreateProject={this.state
                                                                           .projects['write']}
                        />}/>
                        <Route

                            exact path={'/EditProfile'} render={(props) => <EditProfile{...props}
                                                                                       setName={this.setName}


                        />}/>
                        {users['write'] ?
                            <Route
                                exact path={'/AddUser'} render={(props) => <AddUser{...props}
                                                                                   setName={this.setName}


                            />}/> : null}
                        {users['write'] ?
                            <Route
                                exact path={'/EditUser/:id'} render={(props) => <EditUser{...props}
                                                                                         setName={this.setName}


                            />}/> : null}
                        {customers['write'] ?
                            <Route
                                exact path={'/AddCustomer'} render={(props) => <AddCustomer{...props}
                                                                                           setName={this.setName}


                            />}/>
                            : null}
                        {projects['write'] ?
                            <Route
                                exact path={'/AddProject'} render={(props) => <AddProject{...props}
                                                                                         setLocation={this.setLocation}


                            />}/>
                            : null}
                        {customers['write'] ?
                            <Route
                                exact path={'/EditCustomer/:id'} render={(props) => <EditCustomer{...props}
                                                                                                 setName={this.setName}


                            />}/> : null
                        }{projects['read'] ?
                        <Route
                            exact path={'/'} render={(props) => <Main{...props}
                                                                     name={this.state.name}
                                                                     company_name={this.state.company_name}
                                                                     setLocation={this.setLocation}
                                                                     canWrite={resourceAssign}
                                                                     token={this.state.token}
                                                                     canCreateProject={this.state
                                                                         .projects['write']}
                        />
                        }
                        /> : null}
                        <Route
                            exact path={'/Main'} render={(props) => <Main{...props}
                                                                     name={this.state.name}
                                                                     company_name={this.state.company_name}
                                                                     setLocation={this.setLocation}
                                                                     canWrite={resourceAssign}
                                                                     token={this.state.token}
                                                                     canCreateProject={this.state
                                                                         .projects['write']}
                        />
                        }
                        /> : null}
                        {users['read'] ?
                            <Route
                                exact path={'/Users'} render={(props) => <Users{...props}
                                                                               setLocation={this.setLocation}
                                                                               canwrite={users['write']}
                            />}

                            /> : null}

                        {resourceAssign ?
                            <Route
                                exact path={'/Resource'} render={(props) => <ResourceAssignment{...props}
                                                                                               setLocation={this.setLocation}
                                                                                               canwrite={users['write']}
                            />}

                            /> : null}
                        {resourceAssign ?
                            <Route
                                exact path={'/Resource/:projectName'} render={(props) => <ResourceAssignment{...props}
                                                                                                            setLocation={this.setLocation}
                                                                                                            canwrite={users['write']}
                            />}

                            /> : null}
                        {payments['read'] ?
                            <Route
                                exact path={'/Payments'} render={(props) => <Payments{...props}
                                                                                     setLocation={this.setLocation}
                            />}

                            />
                            : null}
                        {discounts['read'] ?
                            <Route
                                exact path={'/Discounts'} render={(props) => <Discounts{...props}
                                                                                       setLocation={this.setLocation}
                                                                                       canWrite={discounts['write']}
                            />}

                            /> : null
                        }
                        {customers['read'] ?
                            <Route
                                exact path={'/Customers'} render={(props) => <Customers{...props}
                                                                                       setLocation={this.setLocation}
                                                                                       canwrite={customers['write']}
                            />}

                            /> : null}
                        {quotations['read'] ?

                            <Route
                                exact path={'/Quotations'} render={(props) => <Bill{...props}
                                                                                   setLocation={this.setLocation}

                                                                                   canWrite={quotations['write']}
                            />}

                            /> : null}

                        {quotations['write'] ?

                            <Route
                                exact path={'/Edit/:refrenceNo/:path'} render={(props) => <EditQuotation{...props}
                                                                                                        setLocation={this.setLocation}
                            />}

                            /> : null}

                        {quotations['write'] ?

                            <Route
                                exact path={'/View/:refrenceNo/:path'} render={(props) => <EditQuotation{...props}
                                                                                                        setLocation={this.setLocation}
                            />}

                            /> : null}

                        {quotations['write'] ?

                            <Route
                                exact path={'/Edit/:refrenceNo/'} render={(props) => <EditQuotation{...props}
                                                                                                   setLocation={this.setLocation}
                            />}

                            /> : null}

                        {quotations['write'] ?

                            <Route
                                exact path={'/View/:refrenceNo/'} render={(props) => <EditQuotation{...props}
                                                                                                   setLocation={this.setLocation}
                            />}

                            /> : null}
                        <Route
                            exact path={'/logout'} render={(props) => <Logout{...props}
                                                                             setToken={this.setToken}
                                                                             token={this.state.token}
                                                                             id={this.state.id}
                        />}

                        />

                        {this.state.permissions.length ? <Route component={NotFound}/> : null}
                    </Switch>
                </div>
            </HashRouter>
            : <HashRouter>
                <Navbary/>
                <div>
                    <Switch>
                        < Route
                            exact path={'/Login'} render={(props) => <Login{...props} setToken={this.setToken}
                        />}
                        />
                        <Route path={'/VerifyEmail/:email'} component={EmailVerified}/>
                        <Route path={'/Forget'} component={Forget}/>
                        <Route path={'/Message'} component={Message}/>
                        <Route exact path={'/Reset/:token'} component={Reset}/>
                        <Route exact path={'/ResetLink'} component={ResetLink}/>
                        <Route
                            render={(props) => <Login{...props}
                                                     setToken={this.setToken}
                            />}/>
                    </Switch>
                </div>
            </HashRouter>
    }

}

export default PrivateRoutes;
