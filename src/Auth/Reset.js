import React, {Component} from 'react';


import {message} from "antd";
import PresaleServices from '../Services/Api/Api';

export default class Reset extends Component {
    state = {
        token: this.props.match.params.token,
        password: "",
        password_confirmation: "",
        errors: {},
        success: ""
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onInput = e => {
        const password = e.target.value;
        if (!password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")) {
            message.error("password must be 8 characters long and should have at least one capital letter and one digit in it.")
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.password!==this.state.password_confirmation){
            message.error("Password and Confirm Password do not match")
        }
        else if(this.state.password.length<8){
            message.error("Password must be at least 8 characters long with at least one number and one capital letter")
        }
        else if(!this.state.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")){
            message.error("Password must be at least 8 characters long with at least one number and one capital letter")
        }
        else {
            const data = this.state;
            PresaleServices.resetPassword({
                password: data.password,
                repassword: data.password_confirmation
                , token: data.token
            }).then(() => this.props.history.push("/ResetLink")).catch(err =>
                message.error("Can't reset password"))

        }
    };

    render() {
        const {password_confirmation, password, errors} = this.state;
        return (
            <div>

                <div className="container login-wrapper mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card mt-3">
                                <form className="was-validated mx-4 my-4" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            name="password"
                                            onChange={this.onChange}
                                            value={password}
                                            onBlur={e => this.OnInput(e)}
                                            required
                                        />
                                        <small id="passwordHelp" className="form-text text-danger">
                                            {errors.password}
                                        </small>
                                        <small
                                            id="passwordHelp"
                                            className="form-text text-success text-bold"
                                        >
                                            {this.state.success}
                                        </small>
                                        {/*<div className="valid-feedback">{this.state.success}</div>*/}
                                        {/*<div className="invalid-feedback">*/}
                                        {/*    {errors.password}*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm password"
                                            name="password_confirmation"
                                            onChange={this.onChange}
                                            value={password_confirmation}
                                            required
                                        />
                                        <div className="valid-feedback">{this.state.success}</div>
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    </div>
                                    {/*<Link*/}
                                    {/*    className="forgot my-2 text-primary fade-in"*/}
                                    {/*    to="/Login"*/}
                                    {/*>*/}
                                    {/*    Back to login*/}
                                    {/*</Link>*/}
                                    <button className="ant-btn ant-btn-primary w-100 d-block">
                                        change password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

