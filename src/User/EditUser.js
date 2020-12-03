import React, {Component} from "react";
import {Button, message} from "antd";
import PresaleServices from "../Services/Api/Api";

export default class EditUser extends Component {
    state = {
        loading: false,
        id: this.props.match.params.id,
        email: "", password: "", repassword: "", role_name: "", status: "", name: "",
        roles: [{value: "", display: "Select role"}],
        statuses: [{value: "", display: "Select status"}, {value: "Active", display: "Active"}, {
            value: "Inactive",
            display: "Inactive"
        }],

    };
    onChangeHandler = e => {
        if (e.target.name !== "email") {
            e.preventDefault();
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        ;
    }

    componentDidMount() {
        PresaleServices.getUser(this.state.id).then(res => {
            if (res) {
                let rolesFetched = res.roles.map(role => {
                    return {value: role, display: role};
                });
                rolesFetched = [{value: "", display: "Select Role"}].concat(
                    rolesFetched
                );
                this.setState({
                    roles: rolesFetched,
                    email: res.users.data.email, password: "",
                    repassword: "", role_name: res.users.data.role_name,
                    status: res.users.data.status, name: res.users.data.name,
                });
                localStorage.setItem("data", JSON.stringify(res.users.data))

            }
        });
    }

    onSubmitHandler = e => {
        this.setState({
            loading: true
        });
        e.preventDefault();
        let flag = false
        if (this.state.name === "") {
            flag = true

            message.error("Name is required");
            this.setState({
                loading: false
            })
        }
        if (this.state.email === "") {
            flag = true

            message.error("Email is required");
            this.setState({
                loading: false
            })
        }

        if (this.state.status === "") {
            flag = true

            message.error("Status is required");
            this.setState({
                loading: false
            })
        }
        if (this.state.user_role === "") {
            flag = true

            message.error("User role name is required");
            this.setState({
                loading: false
            })
        }
        if (this.state.password !== this.state.repassword) {
            message.error("Password and Confirm Password do not match")
            flag = true
            this.setState({
                loading: false
            })
        }

        if (!this.state.email.toLowerCase().includes('vaporvm')) {
            flag = true

            message.error("Can't create user");
            this.setState({
                loading: false
            })
        }
        if (this.state.password.length > 0) {
            if (!this.state.password || ((this.state.password.length < 8)
                || !this.state.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))) {
                {
                    flag = true

                    message.error("password must be 8 characters long and should have at least one capital letter and one digit in it.")

                    this.setState({
                        loading: false
                    })
                }
            }
        }
        if (!flag) {
            PresaleServices.editUser(this.state).then(() => {
                message.success("User is updated .");
                this.setState({
                    loading: false
                });
                this.props.history.push('/Users')
            }).catch(() => {
                message.error("Can't update user.");
                this.setState({
                    loading: false
                });
            })

        }
    };
    onCancel = () => {

        this.props.history.push('/Users')

    }

    render() {
        const {statuses, roles, email, password, repassword, role_name, status, name, loading} = this.state;
        return (
            <div>

                <div className="container">
                    <div className="row mt-2">
                        <div className=" col-md-12 ">
                            <div className="card">
                                <div className="card-body text-capitalize font-weight-bolder text-dark w-100">
                                    <h1>Edit User</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card mt-5">
                                <div className="card-body">
                                    <form onSubmit={this.onSubmitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="username"
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
                                            <label htmlFor="Select hospital">Select status</label>
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

                                        <span className="float-right">
                                             <Button loading={loading} onClick={this.onSubmitHandler}
                                                     className="ant-btn ant-btn-primary w-100 "> Submit</Button>

                                        </span>
                                        <span className="float-right">
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
