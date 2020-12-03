import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import cookie from "react-cookies";
import PresaleServices from '../Services/Api/Api'
import {message} from "antd";
import axios from "axios";

class LogOut extends Component {

    constructor(props) {
        super(props);
        this.state = {

            setToken: this.props.setToken
        };

    }

    componentWillMount() {
        const api = {
            Authorization: "Bearer " + this.props.token

        }

        axios.put('/api/user/' + this.props.id + '/offline', null, {headers: api})
            .then(() => {
                PresaleServices.logOut(this.state)
                    .then(res => {

                        if (res) {
                            cookie.remove("admin_token", {
                                path: "/",
                            });
                            this.setState({loading: false});
                            this.props.setToken("");
                            this.setState({loading: false});
                            window.location.reload();
                        }

                    })
                    .catch(() => {
                        message.error("Email or password not valid");
                        this.setState({loading: false});
                    })
            })
    }

    render() {
        return <Redirect To={"/Login"}/>
    }
}

export default LogOut;