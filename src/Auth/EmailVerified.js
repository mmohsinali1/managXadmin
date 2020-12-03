import React, {Component} from 'react';

class EmailVerified extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:this.props.match.params.email,
        };

    }
    render() {
        return (
            <div>

                <div className="container login-wrapper mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card text-center">
                                <div className="card-header">
                                    <h2 className="text-center my-3">Email Address Verified</h2>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Thank you for verifying your email address.
                                        Please
                                        <a href="javascript:void(0)"
                                           onClick={()=>this.props.history.push("/Login")}
                                        > Click here </a><br/>
                                        to login
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailVerified;
