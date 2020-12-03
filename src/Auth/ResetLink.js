import React, {Component} from 'react';

import {Link, } from "react-router-dom";

export default class ResetLink extends Component {
    render() {
        return (
            <div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card mt-3">
                                <div className="card-body mx-3 my-3 text-center">
                                    <p>your password has been changed successfully</p>
                                    <p>Please <span><Link to={'/Login'}>Login</Link> </span> to continue</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

