import React, {Component} from "react";
import {Button, message} from "antd";
import PresaleServices from "../Services/Api/Api";
import Phone from "../Common/Phone";

export default class EditUser extends Component {
    state = {
        loading: false,
        id: this.props.match.params.id,
        email: "", password: "", repassword: "", company_name: "", name: "",
        phone: ""
    };
    setPhone=phone=>{
        this.setState({
            phone: phone
        })
    }
    onChangeHandler = e => {
        if (e.target.name !== "email") {
            e.preventDefault();
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    componentDidMount() {
        PresaleServices.getCustomer(this.state.id).then(res => {
            if (res) {
                this.setState({
                    email: res.data.email, password: "",
                    repassword: "", company_name: res.data.company_name,
                    phone: res.data.phone, name: res.data.name,
                });

            }

        });

    }

    onSubmitHandler = e => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        let flag = false

        if (this.state.name === "") {
            flag = true
            message.error("name is required");
            this.setState({
                loading: false
            })
        }
        if (this.state.email === "") {
            flag = true
            message.error("email is required");
            this.setState({
                loading: false
            })
        }
        if (this.state.phone === "") {
            flag=true;
            message.error("Phone is required");
            this.setState({
                loading: false
            })
        }
        if (this.state.company_name === "") {
            flag=true;
            message.error("Company name is required");
            this.setState({
                loading: false
            })
        }
        
        if (this.state.password !== this.state.repassword) {
            flag = true
            message.error("Password and Confirm Password do not match")
            this.setState({
                loading: false
            })
        }

        if (this.state.password.length) {
            if (!this.state.password || (this.state.password.length < 8 || !this.state.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))) {
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
            PresaleServices.editCustomer(this.state).then(() => {
                message.success("Customer Updated successfully.");
                this.setState({
                    loading: false
                });
                this.props.history.push('/Customers')
            }).catch(() => {
                message.error("can't update user.")
                this.setState({
                    loading: false
                });
            })

        }
    };
    onCancel = () => {

        this.props.history.push('/Customers')

    }

    render() {
        const {email, password, repassword, company_name, phone, name, loading} = this.state;
        

        return (
            <div>

                <div className="container">
                    <div className="row mt-2">
                        <div className=" col-md-12 ">
                            <div className="card">
                                <div className="card-body text-capitalize font-weight-bolder text-dark w-100">
                                    <h1>Edit Customer</h1>
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
                                            <label htmlFor="phone">Phone:</label>
                                            <Phone setValue={this.setPhone} initial={phone}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Company Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Company Name"
                                                name="company_name"
                                                required
                                                value={company_name}
                                                onChange={this.onChangeHandler}
                                            />
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
                                                     className="ant-btn ant-btn-primary w-100 "> cancel</Button>
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
