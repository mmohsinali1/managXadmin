import React, {Component} from 'react';
import Pagination from "../Common/Pagination";

import PresaleServices from '../Services/Api/Api';
import {EyeOutlined, FormOutlined} from "@ant-design/icons";


export default class Discount extends Component {
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
        if(e.target.type==="date"){
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
        PresaleServices.getDiscounts()
            .then(res =>  {

                const { currentPage, itemsPerPage} = this.state;
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
                let currentFiltered;
                let data=res.data
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
        this.props.history.push(`/Edit/${reference_no}/discount`)
    };


    render() {
        const {filtered, itemsPerPage, data,searching,loaded} = this.state;

        const tableRows = filtered.length ? (
            filtered.map((item, index) => {
                return (
                    <tr className="text-left" key={index}>
                        <td>{item.name}</td>
                        <td>{item.company_name}</td>
                        <td>{item.reference_no}</td>
                        <td>{item.amount}</td>
                        <td>{item.quoted_date}</td>
                        <td>{item.status}</td>
                        {
                            this.props.canWrite?<td>{
                                    item.status!=="Paid"? <FormOutlined onClick={() => this.editQuotation(item.reference_no)}/>
                                        : <EyeOutlined onClick={() => this.props.history.push(`/View/${item.reference_no}/discount`)} />
                                }
                                </td>
                                :null}

                    </tr>
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
                    <div className="card mt-3">
                        <div className="card-header text-bolder">
                            <h4 className="font-weight-bold mb-0">Manage Discount</h4>
                        </div>
                        <div className="card-body">
                            <table className="table ">
                                <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="name"
                                            placeholder="Customer Name"
                                            onChange={this.onChangeHandler}
                                            required

                                        />
                                    </th>

                                    <th width="170px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            placeholder="Company Name"
                                            name="company_name"
                                            onChange={this.onChangeHandler}
                                            required

                                        />
                                    </th>
                                    <th width="180px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="reference_no"
                                            placeholder="Reference Number"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th width="180px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="amount"
                                            placeholder="Amount"
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
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="status"
                                            placeholder="Status"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                </tr>
                                <tr className="text-left">
                                    <th >Customer Name</th>
                                    <th >Company Name</th>
                                    <th >Reference Number</th>
                                    <th>Amount</th>
                                    <th>Payment Date</th>
                                    <th>Status</th>
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


