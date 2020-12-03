import React, {Component} from 'react';

class Message extends Component {

    render() {

        return (
            <div>

                <div className="container login-wrapper mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card text-center">
                                <div className="card-header">
                                    <h2 className="text-center my-3">Reset Your Password</h2>
                                </div>

                                <div className="card-body">

                                    <p>We have sent you an email with password reset link. Please check your inbox to reset your password.
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

export default Message

