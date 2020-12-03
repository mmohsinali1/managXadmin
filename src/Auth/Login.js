import React, {Component} from 'react';
import {Link} from "react-router-dom";
import cookie from "react-cookies";
import { Card, message} from "antd";
import PresaleServices from '../Services/Api/Api'


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            setToken: this.props.setToken,
            token:cookie.load('admin_token')
        };

    }
componentDidMount() {
        const {token}=this.state
if(token!==undefined&&token!==""){
    console.log(this.props.history.location.pathname,"path")
    if(!(this.props.history.location.pathname.includes('Login')))
        window.location.reload()
    else
        this.props.history.push("/Main")
        this.props.setToken(token)
}
}

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onInput=e=>{
        if(e.target.type==="email")
        {
            // if(!e.target.value.toLowerCase().includes('vaporvm')){
            //     message.error("Please enter valid credentials to login");
            // }
        }
    }
    onSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const {email, password,} = this.state;
        if (email !== "" && password !== "") {
            if(!email.toLowerCase().includes('vaporvm')){
            message.error("Please enter valid credentials to login");
                this.setState({loading: false});
            }else{
            PresaleServices.login(this.state)
                .then(res => {
                    if (res&&res.api_key) {
                        cookie.save("admin_token", res.api_key, {
                            path: "/",
                            maxAge: 5 * 3600
                        });
                        this.setState({loading: false});
                        this.state.setToken(res.api_key);
                        if(!(this.props.history.location.pathname.includes('Login')))
                            window.location.reload()
                        else
                            this.props.history.push("/Main")
                    }
                })
                .catch(err => {
                    if(err.toString().includes(401)){
                        message.error("User is Inactive");

                    }
                    else
                    message.error("Please enter valid credentials to login");
                    this.setState({loading: false});
                })
        }
        }
        else{
            message.error("Please enter valid credentials to login");
            this.setState({
                loading: false
            })
        }
    };

    render() {

        const {email, password, loading} = this.state;
        return (
            <div>
                <div className="container login-wrapper mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <Card loading={loading} className="card mt-3">
                                <div className="card-header"><h2 className="text-center">Login to your account</h2>
                                </div>
                                <form className="was-validated mx-4 my-4">
                                    <div className="form-group">

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            name="email"
                                            required
                                            onChange={this.onChange}
                                            value={email}
                                            pattern="^[a-zA-Z]+.*@[A-Za-z]+([.][a-zA-Z]+)+$"
                                            onBlur={this.onInput}
                                        />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">
                                        </div>
                                    </div>
                                    <div className="form-group">

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                            name="password"
                                            required
                                            onChange={this.onChange}
                                            value={password}
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
                                        />
                                    </div>
                                    {/*<Link*/}
                                    {/*    className="forgot my-2 text-success fade-in float-right"*/}
                                    {/*    to="/Forget"*/}
                                    {/*>*/}
                                    {/*    Forgot Password?*/}
                                    {/*</Link>*/}
                                    <button type="submit" className=" ant-btn ant-btn-primary btn-success btn-block "
                                            onClick={this.onSubmit}>
                                        Login
                                    </button>

                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login
