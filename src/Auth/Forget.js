import React, {Component} from 'react';

import PresaleServices from '../Services/Api/Api'

import {Link} from "react-router-dom";
import {message} from "antd";

export default class Forget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
        };

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSubmit = e => {
        e.preventDefault();
        if (!this.state.email.toLowerCase().includes('vaporvm')) {
            message.error("this email is not registered with us.");
            this.setState({loading: false});
        } else {
            PresaleServices.forget(this.state).then(res => {
                this.props.history.push('/Message')
            }).catch(err => {
                message.error("this email is not registered with us.")
            })
        }
    };

    render() {
        const {email} = this.state;

        return (
            <div>

                <div className="container login-wrapper mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card mt-3 ">
                                <form className="was-validated mx-4 my-4">
                                    <div className="form-group ">

                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter email"
                                            name="email"
                                            required
                                            onChange={this.onChange}
                                            value={email}
                                            pattern="^[a-zA-Z]+.*@[A-Za-z]+([.][a-zA-Z]+)+$"
                                        />{this.state.email !== "" ? <div>
                                        <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">
                                            Please fill out this field.
                                        </div>
                                    </div> : null}
                                    </div>
                                    <button
                                        value={"Reset password"}
                                        onClick={this.onSubmit}
                                        className="ant-btn ant-btn-primary w-100 mt-3"
                                    >
                                        Request Reset link
                                    </button>
                                    <Link
                                        className="forgot w-100 text-center m-auto d-block pt-3"
                                        to="/Login"
                                    >
                                        Back to Login
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

