import React, {Component} from 'react';
import cookie from "react-cookies";
import Pagination from "../Common/Pagination";

import PresaleServices from '../Services/Api/Api';
import {Button} from "antd";
import { EditOutlined } from '@ant-design/icons';
export default class Users extends Component {
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
            searching: false,
            loaded: false
        };
        this.props.setLocation(this.props.history.location.pathname)
    }

    onChangeHandler = e => {
        e.preventDefault();
        const {data, searched, itemsPerPage} = this.state;
        const currentPage = 1;
        let value = e.target.value;
        if (e.target.type == "date") {
            let temp = value.split("-")
            temp = temp.reverse();
            value = temp.join('/')
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
        let searchingflag = false;
        for (key in searched) {

            value = searched[key];
            if (value !== "")
                searchingflag = true
        }
        if (!searchingflag) {
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
            this.setState({
                filtered: filtered.slice(
                    indexOfFirstItem, indexOfLastItem
                ),
                searched: searched,
                searching: false
            });
        } else
            this.setState({
                filtered: filtered,
                searched: searched,
                searching: true
            });
    };

    componentDidMount() {
        PresaleServices.getUsers()
            .then(res => {

                const {currentPage, itemsPerPage} = this.state;
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
                let currentFiltered;
                let data = res.data
                this.setState({
                    data
                }, () => {
                    if (data.length) {
                        const temp = [...data];
                        currentFiltered = temp.slice(
                            indexOfFirstItem,
                            indexOfLastItem
                        );
                    } else {
                        currentFiltered = []
                    }
                    this.setState({filtered: currentFiltered, loaded: true});
                });
            })
            .catch(err => console.log(err));
    }

    paginate = pageNumber => {
        const {data, itemsPerPage} = this.state;
        const indexOfLastItem = pageNumber * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const temp = [...data];
        const currentFiltered = temp.slice(indexOfFirstItem, indexOfLastItem);
        this.setState({currentPage: pageNumber, filtered: currentFiltered});
    };

    addUserPage=()=>{
        this.props.history.push('/AddUser');
    };


//editUser bhj
    editUser=(id)=>{
      this.props.history.push(`/EditUser/${id}`)
    };
    render() {
        const { filtered, itemsPerPage, data, searching, loaded} = this.state;

        const tableRows = filtered.length ? (
            filtered.map((item, index) => {
                return (
                    <tr className="text-left" key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.status}</td>
                        <td>{item.role_name}</td>
                        {this.props.canwrite?<td >
                            {/*//<button className=" btn btn-large green" > update</button>*/}
                            <EditOutlined onClick={()=>this.editUser(item.id)} />
                        </td>:null}

                    </tr>
                );
            })
        ) : (
            loaded ? <tr>
                <td className="float-left">
                    <p className="text-danger float-left">No record found</p>
                </td>
            </tr> : null
        );
        return (
            <div>


                <div className="content search-table-wrapper"
                     id="main-content"
                     style={{clear: "both", width: "90%", marginLeft: "8%"}}
                >
                    <div className="container-fluid mt-5">
                        <div className="row">

                                <div className=" col-md-12 card">
                                    <div className="card-body text-capitalize font-weight-bolder text-dark w-100">
                                        <h4 className="d-inline-block">Users</h4>
                                        {this.props.canwrite?
                                        <span className="float-right">
                                            <Button  onClick={this.addUserPage} className="ant-btn ant-btn-primary w-100 "> Add User</Button>
                                        </span>:null}
                                    </div>

                            </div>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header text-bolder">
                            <h4 className="font-weight-bold mb-0">Manage Users</h4>
                        </div>
                        {
                            <div className="float-right">
                                {/*<AddUser addData={this.addHandler}/>*/}
                            </div>

                        }

                        <div class="card-body">
                            <table class="table ">
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
                                            name="role_name"
                                            placeholder="User Role"
                                            onChange={this.onChangeHandler}
                                            required
                                        />
                                    </th>
                                    <th></th>
                                </tr>
                                <tr className="text-left">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>User Role</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody className="text-center">{tableRows}</tbody>
                            </table>

                        </div>
                    </div>
                    <br />
                    {!searching ?
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={data.length}
                            paginate={this.paginate}
                        /> : null}
                </div>
            </div>
        );
    }

}


