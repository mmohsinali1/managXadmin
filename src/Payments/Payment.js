import React, {Component} from 'react';
import Pagination from "../Common/Pagination";
import {Redirect, Link} from 'react-router-dom'
import PresaleServices from '../Services/Api/Api';


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
        PresaleServices.getPayments()
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
                        <td>{item.payment_date}</td>
                        <td style={{textAlign: "center"}}>
                            <div className="row">
                                <div className="col-md-3">
                                    {//<EditUser item={item} editData={this.editHandler}/>
                                    }</div>

                            </div>
                        </td>

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
                    <div class="card mt-3">
                        <div class="card-header text-bolder">
                            <h4 className="font-weight-bold mb-0">Manage Payments</h4>
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
                                            placeholder="Customer Name"
                                            onChange={this.onChangeHandler}
                                            required

                                        />
                                    </th>

                                    <th  >
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            placeholder="Company Name"
                                            name="company_name"
                                            onChange={this.onChangeHandler}
                                            required

                                        />
                                    </th>
                                    <th >
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="reference_no"
                                            placeholder="Reference Number"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th >
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="amount"
                                            placeholder="Amount"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th  >
                                        <input
                                            type="date"
                                            className="form-control W-100 d-block"
                                            name="quoted_date"
                                            placeholder="Quotation date"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th >
                                        <input
                                            type="date"
                                            className="form-control W-100 d-block"
                                            name="payment_date"
                                            placeholder="payment_date"
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
                                    <th>Quotation Date</th>
                                    <th>Payment Date</th>
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


