import React, {Component} from 'react';
import cookie from "react-cookies";
import Pagination from "../Common/Pagination";
import {Redirect} from 'react-router-dom'
import PresaleServices from '../Services/Api/Api';
import { FormOutlined,EyeOutlined } from '@ant-design/icons';
export default class Bill extends Component {
    constructor(props) {
        super(props);
        let loggedIn = null;
        this.state = {
            loggedIn,
            data: [],
            filtered: [],
            searched: [],
            currentPage: 1,
            itemsPerPage: 5,
            searching:false,
            loaded:false
        };
        this.props.setLocation(this.props.history.location.pathname)
    }

    onChangeHandler = e => {
        e.preventDefault();
        const {data, searched,itemsPerPage} = this.state;
        const currentPage=1;
        let value = e.target.value;
        if(e.target.type=="date"){
            let temp=value.split("-")
            temp=temp.reverse();
            value=temp.join('/')
        }
        let filtered = [...data];
        let key = e.target.name;
        searched[key] = value;
        for (key in searched) {
            value = searched[key];
            if (value !== "") {
                filtered = filtered.filter(el => {
                    const lc = el[key].toLowerCase();
                    const filter = value.toLowerCase();
                    return lc.includes(filter);
                });
            }
        }
        let searchingflag=false;
        for (key in searched){

            value=searched[key];
            if(value!=="")
                searchingflag=true
        }
        if(!searchingflag){
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
            this.setState({
                filtered: filtered.slice(
                    indexOfFirstItem, indexOfLastItem
                ),
                searched: searched,
                searching:false
            });
        }
        else
            this.setState({
                filtered: filtered,
                searched: searched,
                searching:true
            });
    };

    componentDidMount() {
        PresaleServices.getBills()
            .then(res =>  {

                const { currentPage, itemsPerPage} = this.state;
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
                let currentFiltered;
                let data=res.data.cyber_security
                data= data.concat(res.data.office365)

                this.setState({
                    data
                },()=>{
                    if(data.length){
                        const temp = [...data];
                        currentFiltered = temp.slice(
                            indexOfFirstItem,
                            indexOfLastItem
                        );}
                    else {
                        currentFiltered=[]
                    }
                    this.setState({filtered: currentFiltered,loaded:true});
                });
            })
            .catch(err => console.log(err));
    }

    paginate = pageNumber => {
        const {data,itemsPerPage} = this.state;
        const indexOfLastItem = pageNumber * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const temp = [...data];
        const currentFiltered = temp.slice(indexOfFirstItem, indexOfLastItem);
        this.setState({currentPage: pageNumber, filtered: currentFiltered});
    };

    editQuotation=reference_no=>{
        this.props.history.push(`/Edit/${reference_no}`)
    };

    render() {
        const {filtered, itemsPerPage, data,searching,loaded} = this.state;

        const tableRows = filtered.length ? (
            filtered.map((item, index) => {
                return (
                    <tr className="text-left" key={index}>
                        <td>{item.name}</td>
                        <td>{item.company_name}</td>
                        <td>{item.amount}</td>
                        <td>{item.status}</td>
                        <td >{item.reference_no}</td>
                        <td>{item.quoted_date}</td>
                        <td>{item.payment_date}</td>
                        {
                            this.props.canWrite?<td>{
                               item.status!=="Paid"? <FormOutlined onClick={() => this.editQuotation(item.reference_no)}/>
                            : <EyeOutlined onClick={() => this.props.history.push(`/View/${item.reference_no}`)} />
                            }
                            </td>
                        :null}</tr>
                );
            })
        ) : (
            loaded?<tr>
                <td className="float-left">
                    <p className="text-danger float-left">No record found</p>
                </td>
            </tr>:null
        );
        return (
            <div>
                <div className="content search-table-wrapper"
                     id="main-content"
                     style={{clear: "both", width: "90%", marginLeft: "8%"}}
                >
                    <div class="card mt-3">
                        <div class="card-header text-bolder">
                            <h4 className="font-weight-bold mb-0">Manage Bills And Payments</h4>
                        </div>
                        <div class="card-body">
                            <table class="table ">
                                <thead>
                                {/*                 <tr className="text-left">
                                <th >Customer Name</th>
                                <th >Company Name</th>
                                <th >Reference Number</th>
                                <th >Amount</th>
                                <th >Quotation date</th>

                            </tr>*/}
                                <tr>

                                    <th>
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="name"
                                            placeholder="Name"
                                            onChange={this.onChangeHandler}
                                            required

                                        />
                                    </th>

                                    <th width="170px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            placeholder="Company name"
                                            name="company_name"
                                            onChange={this.onChangeHandler}
                                            required

                                        />
                                    </th>
                                    <th width="180px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="amount"
                                            placeholder="amount"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th width="180px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="status"
                                            placeholder="Status"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th width="180px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="reference_no"
                                            placeholder="Reference number"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>

                                    <th width="180px">
                                        <input
                                            type="date"
                                            className="form-control W-100 d-block"
                                            name="quoted_date"
                                            placeholder="Quotation date"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th width="180px">
                                    <input
                                        type="date"
                                        className="form-control W-100 d-block"
                                        name="payment_date"
                                        placeholder="Payment date"
                                        onChange={this.onChangeHandler}
                                        required
                                    />
                                </th>
                                <th></th>
                                </tr>
                                <tr className="text-left">
                                    <th >Customer Name</th>
                                    <th >Company name</th>
                                    <th >Amount</th>
                                    <th>Status</th>
                                    <th>Reference Number</th>
                                    <th >Quotation date</th>
                                    <th>Payment date</th>

                                </tr>
                                </thead>
                                <tbody className="text-center">{tableRows}</tbody>
                            </table>

                        </div>
                    </div>
                    <br />
                    {!searching?
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={data.length}
                            paginate={this.paginate}
                        />:null}
                </div>
            </div>
        );
    }

}


