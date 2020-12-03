import React,{Component} from 'react'
import Header from "../Survey/Header";
import {Tooltip,Divider,Icon} from "antd";


class Quotation extends Component{
    render() {
        return(
            <section className="payment-form-wrapper">

                <Header HeaderText={"Payment Details"}/>
                <div className="container">

                    <div className="row mt-5">
                        <div className="col-md-6">
                            <h3>Payment With</h3>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="payment-method-box active">
                                        <Icon type="dollar" className="mt-3" theme="outlined"/>
                                        <span>Credit Card</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="payment-method-box ">
                                        <Icon type="dollar" className="mt-3" theme="outlined"/>
                                        <span>PayPal</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="payment-method-box">
                                        <Icon type="dollar" className="mt-3" theme="outlined"/>
                                        <span>Others</span>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <fieldset>
                                        <label>Card Number</label>
                                        <input type="number" className="form-control" minLength={12} maxLength={12} placeholder="The digits on the front your cards"/>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <fieldset>
                                        <label>Expiration Date</label>
                                        <input type="text" className="form-control" placeholder="MM/YY"/>
                                    </fieldset>
                                </div>
                                <div className="col-md-6">
                                    <fieldset>
                                        <label>Security Code</label>
                                        <div className="input-group">
                                            <Tooltip placement="topLeft" title="pls put your security code here">
                                            <Icon type="question" className="mt-3 field-icon" theme="outlined"/>
                                            </Tooltip>
                                        <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <fieldset>
                                        <label>Name on Card</label>
                                        <input type="text" className="form-control" placeholder="Find this on the front your card"/>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mt-5 mb-5">
                                    <fieldset>
                                        <button type="submit" className="ant-btn ant-btn-primary w-100" value="Place Order"/>
                                    </fieldset>
                                    <p className="small mt-3">By clicking the button, you agree to the <a href="#">Terms and Conditions</a></p>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <h3>Order Summary</h3>
                            <div className=" gray-box">

                            <div className="row">
                                <div className="col-md-12  text-left">
                                    <p className="font-weight-bolder product-title">Office 365 migration</p>
                                    <p>Reference Number:
                                    <span className="font-weight-bolder">  VP56837422332 </span></p>
                                </div>
                                <div className="col-md-12 ">

                                    <p><a  className="float-left " href="#">Price Quote:</a></p>
                                    <div className="font-weight-bolder total-text float-right text-right ">$450</div>
                                </div>

                            </div>
                            <Divider/>
                            <div className="row">
                                <div className="col-md-8 text-left">
                                    <p className="font-weight-bolder">Sub total</p>
                                </div>
                                <div className="col-md-4 text-right">
                                    <p className="font-weight-bolder green-text total-text">$450</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Quotation
