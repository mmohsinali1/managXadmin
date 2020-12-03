import React, {Component} from 'react';
import Pagination from "../Common/Pagination";
import PresaleServices from '../Services/Api/Api';
import {Button} from "antd";
import { EditOutlined } from '@ant-design/icons';

export default class Customers extends Component {
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
        PresaleServices.getCustomers()
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
    addCustomerPage=()=>{
        this.props.history.push('/AddCustomer');
    };
    editUser=(id)=>{

        this.props.history.push(`/EditCustomer/${id}`)
    };
    render() {
        const {filtered, itemsPerPage, data,searching,loaded} = this.state;

        const tableRows = filtered.length ? (
            filtered.map((item, index) => {
                return (
                    <tr className="text-left" key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.company_name}</td>
                        <td>{item.verified}</td>
                        <td style={{textAlign: "center"}}>
                            {this.props.canwrite?<span >
                                {/*<button className=" btn btn-large green"> update</button>*/}
                                <EditOutlined  onClick={()=>this.editUser(item.id)}/>
                            </span>:null}
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
                {/*<Header HeaderText={"Billings and Purchased"}/>*/}
                <div className="content search-table-wrapper"
                     id="main-content"
                     style={{clear: "both", width: "90%", marginLeft: "8%"}}
                >
                    <div className="container-fluid mt-5">
                        <div className="row">
                                <div className="col-md-12 card">
                                    <div className="card-body text-capitalize font-weight-bolder text-dark w-100">
                                        <h4 className="d-inline-block">Customers</h4>
                                        {this.props.canwrite?
                                            <span className="float-right">
                                           {this.props.canwrite?
                                               <span className="float-right">
                                            <Button  onClick={this.addCustomerPage} className="ant-btn ant-btn-primary w-100 "> Add Customer</Button>
                                        </span>:null}
                                        </span>:null}
                                    </div>

                            </div>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header text-bolder">
                            <h4 className="font-weight-bold mb-0"> Manage Customers</h4>
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
                                            placeholder="Name"
                                            onChange={this.onChangeHandler}
                                            required

                                        />
                                    </th>

                                    <th width="170px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            placeholder="Email"
                                            name="email"
                                            onChange={this.onChangeHandler}
                                            required

                                        />
                                    </th>
                                    <th width="180px">
                                        <input
                                            type="number"
                                            className="form-control W-100 d-block"
                                            name="phone"
                                            placeholder="Phone Number"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th width="190px">
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="company_name"
                                            placeholder="Company Name"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            className="form-control W-100 d-block"
                                            name="verified"
                                            placeholder="Account status"
                                            onChange={this.onChangeHandler}
                                            required
                                        />

                                    </th>
                                </tr>
                                <tr className="text-left">
                                    <th >Name</th>
                                    <th >Email</th>
                                    <th >Phone Number</th>
                                    <th>Company Name</th>
                                    <th>Account Status</th>

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


