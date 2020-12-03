import React, {Component} from "react";
import {Button, message} from "antd";
import PresaleServices from "../Services/Api/Api";

export default class AddUser extends Component {
    state = {
        email: "", password: "", repassword: "", role_name: "", status: "", name: "",profile_Image:"",experience:'0',
        roles: [{value: "", display: "Select role"}],
        statuses: [{value: "", display: "Select status"}, {value: "Active", display: "Active"}, {
            value: "Inactive",
            display: "Inactive"
        }],
        fetching: false
    };

    onChangeHandler = e => {
        console.log(e)
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSubmitHandler = e => {
        this.setState({
            fetching: true
        });
        e.preventDefault();
        let flag = false
        if (this.state.name === "") {
            flag = true;

            message.error("name is required");
            this.setState({
                fetching: false
            })
        }
        if (this.state.email !== "") {
            if (!this.state.email.toLowerCase().includes('vaporvm')) {
                flag = true

                message.error("can't create user");
                this.setState({
                    fetching: false
                })
            }
        }
        if (this.state.email === "") {
            flag = true

            message.error("email is required");
            this.setState({
                fetching: false
            })
        }
        if (this.state.experience === "") {
            flag = true

            message.error("Experience is required");
            this.setState({
                fetching: false
            })
        }

        if (this.state.status === "") {
            flag = true;
            message.error("Status is required");
            this.setState({
                fetching: false
            })
        }
        if (this.state.role_name === "") {
            flag = true
            message.error("User role name is required");
            this.setState({
                fetching: false
            })
        }
        if (this.state.password !== this.state.repassword) {
            message.error("Password and Confirm Password do not match")
            flag = true
            this.setState({
                fetching: false
            })
        }
        if (this.state.password === "") {
            flag = true
            message.error("Password is required");
            this.setState({
                fetching: false
            })
        }
        if (this.state.repassword === "") {
            flag = true;

            message.error("Confirm Password is required");
            this.setState({
                fetching: false
            })
        }
        if (this.state.password !== "") {
            if (this.state.password.length < 8 || !this.state.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")) {
                {
                    flag = true
                    message.error("password must be 8 characters long and should have at least one capital letter and one digit in it.")
                    this.setState({
                        fetching: false
                    })
                }
            }
        }
        if (this.state.profile_Image === "") {
            flag = true
            message.error("Profile Image is required");
            this.setState({
                fetching: false
            })
        }        
        if (!flag) {
            PresaleServices.createUser(this.state).then(() => {
                
                console.log(this.state)
                this.setState({
                    fetching: false
                });
                message.success("User created successfully.")
                this.props.history.push('/Users')
            }).catch(() => {
                message.error("Email is already taken.");
                this.setState({
                    fetching: false
                });
            })

        }
    };

    componentDidMount() {
        PresaleServices.getRoles().then(res => {
            if (res) {
                let rolesFetched = res.map(role => {
                    return {value: role, display: role};
                });
                rolesFetched = [{value: "", display: "Select Role"}].concat(
                    rolesFetched
                );
                this.setState({roles: rolesFetched});
            }
        });
    }

    onCancel = () => {

        this.props.history.push('/Users')
    }

    render() {
        const {statuses, roles, email, password, repassword, role_name, status, name, fetching,profile_Image,experience} = this.state;
        return (
            <div>

                <div className="container">
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <div className=" card">
                                <div className="card-body text-capitalize font-weight-bolder text-dark w-100">
                                    <h1>User</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className=" card mt-5">
                                <div className="card-body">
                                    <form onSubmit={this.onSubmitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                name="name"
                                                required
                                                value={name}
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Email:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                required
                                                value={email}
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Select status">Select status</label>
                                            <select
                                                className="form-control"
                                                name="status"
                                                value={status}
                                                onChange={this.onChangeHandler}
                                                required
                                            >
                                                {statuses.map(_status => (
                                                    <option key={_status.value} value={_status.value}>
                                                        {_status.display}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Select hospital">Select Role</label>
                                            <select
                                                className="form-control"
                                                name="role_name"
                                                value={role_name}
                                                onChange={this.onChangeHandler}
                                                required
                                            >
                                                {roles.map(_role => (
                                                    <option key={_role.value} value={_role.value}>
                                                        {_role.display}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Password:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                name="password"
                                                required
                                                value={password}
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Confirm Password:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Confirm Password"
                                                name="repassword"
                                                required
                                                value={repassword}
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Profile Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                placeholder="Profile Img"
                                                name="profile_Image"
                                                required
                                                value={profile_Image}
                                               onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Epxerience (Years):</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Years of Experience"
                                                name="experience"
                                                required
                                                value={name}
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>

                                        <span className="float-right">
                                             <Button loading={fetching} onClick={this.onSubmitHandler}
                                                     className="ant-btn ant-btn-primary w-100 "> Submit</Button>
                                        </span>
                                        <span className="float-right mx-md-2 mx-sm-0">
                                             <Button onClick={this.onCancel}
                                                     className="ant-btn ant-btn-primary ant-btn-gray w-100 "> cancel</Button>
                                        </span>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
