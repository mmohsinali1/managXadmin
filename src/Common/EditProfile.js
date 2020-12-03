import React, {Component} from 'react';

import PresaleServices from '../Services/Api/Api'
import {Button, message, Card} from "antd";

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            email: "",
            password: "",
            setName: this.props.setName,
            repassword: "",
            loading: false
        }
    }

    onInput = e => {
        const password = e.target.value;
        if (password !== "") {
            if (password.length < 8 || !password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")) {
                message.error("Password must be at least 8 characters long with at least one number and one capital letter")
            }
        }
    }
    onSubmit = e => {
        let flag = true
        this.setState({
            loading: true
        });

        e.preventDefault();
        if (this.state.name === "") {
            flag = false
            message.error("name is required");
            this.setState({
                loading: false
            })
        }
        if (this.state.password != this.state.repassword) {
            flag = false
            message.error("Password and Confirm Password do not match")
            this.setState({
                loading: false
            })
        }
        if (this.state.password.length > 0 && this.state.password.length < 8) {
            flag = false
            message.error("Password must be at least 8 characters long with at least one number and one capital letter ")
            this.setState({
                loading: false
            })

        }

        if (this.state.password !== "" && !this.state.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")) {
            {
                flag = false
                message.error("Password must be at least 8 characters long with at least one number and one capital letter")

                this.setState({
                    loading: false
                })
            }
        }
        if (flag) {

            PresaleServices.editProfile(this.state).then(
                res => {
                    this.props.setName(this.state.name);

                    this.props.history.push('/EditProfile');
                    message.success("profile has been updated")
                    this.setState({
                        loading: false
                    })
                }).catch(err => {
                    message.error("can't update user");
                    this.setState({
                        loading: false
                    })
                }
            )
            this.setState({
                loading: false
            })
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        PresaleServices.geteditProfile().then(res => {
                if (res) {
                    this.setState({
                        name: res.name,
                        email: res.email,

                        loading: false
                    })

                } else {
                    //message.error("Profile not updated");
                    this.setState({
                        loading: false
                    })
                }
            }
        ).catch(err => {
            message.error(err);
        });
    }

    onChangeHandler = e => {
        if (e.target.type !== "email") {
            e.preventDefault();
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    render() {
        const {name, email, password, repassword, loading} = this.state;
        return (
            <div>

                <div className="container login-wrapper mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <Card className="card" loading={loading}>
                                <div className="card-header"><h2>Personal Details</h2></div>
                                <div className="card-body row">
                                    <div className="form-group col-md-6">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Full Name"
                                            name="name"
                                            value={name}
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email Address"
                                            name="email"
                                            value={email}
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="New Password"
                                            value={password}
                                            onBlur={this.onInput}
                                            onChange={this.onChangeHandler}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            name="repassword"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            value={repassword}
                                            onChange={this.onChangeHandler}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <Button type="primary" className="ant-btn ant-btn-primary mt-3 float-right"
                                                onClick={this.onSubmit}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

