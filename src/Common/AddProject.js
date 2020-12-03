import React, {Component} from 'react';
import {Button, message, Card} from "antd";
import PresaleServices from "../Services/Api/Api";
import {Select} from 'antd';
import 'antd/dist/antd.css';


class AddProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customersFetched: [],
            types: [{value: "", display: "Select type"}, {value: "Office 365", display: "Office 365"}, {
                value: "Cyber",
                display: "Cyber"
            }, {
                value: "Manage Services",
                display: "Manage Services"
            }],
            customer_id: "",
            project_name: "",
            project_type: ""

        }

        this.props.setLocation('/Main')
    }


    onSubmit = e => {
        e.preventDefault();
        const {customer_id, project_name, project_type,} = this.state
        let flag=false
        if (customer_id=="") {
            message.error("please Choose user")
            flag=true
        }
        if (project_name === "") {
            message.error("Project name is necessary")
            flag=true
        }
        if (project_type === "") {
            message.error("Project type is necessary")
            flag=true
        }
        if(!flag) {
            PresaleServices.createProject(
                {
                    id:customer_id,
                    name:project_name,
                    project_type:project_type
                }
            ).then(() => {
                message.success("Project created successfully.")
                this.props.history.push('/')
            }).catch(() => {
                message.error("name already taken.")
            })

        }
    }

    componentDidMount() {
        PresaleServices.getProjectCustomers().then(res => {
            if (res) {
                if(res.length===0){
                    message.error("please create customer first")
                }
                let customersFetched = res.map(customer => {
                    return {value: customer.id, display: customer.name};
                });
                customersFetched = [{value: "", display: "Select Customer"}].concat(
                    customersFetched
                );
                this.setState({customersFetched: customersFetched});
            }
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })}
    onCancel=()=>{
        this.props.history.push('/')
    }


    render() {
        const {
            customer_id, types,
            project_name, project_type, customersFetched

        } = this.state
        return (
            <div className="col-md-6 offset-md-3">

                <h3 className="mt-5">Add Project</h3>
                <div className="form-group">

                    <input
                        type="project"
                        className="form-control"
                        placeholder="Project Name"
                        name="project_name"
                        required
                        onChange={this.onChange}
                        value={project_name}

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Select status">select Type</label>
                    <select
                        className="form-control"
                        name="project_type"
                        value={project_type}
                        onChange={this.onChange}
                        required
                    >
                        {types.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.display}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Select status">select Customer</label>
                    <select
                        className="form-control"
                        name="customer_id"
                        value={customer_id}
                        onChange={this.onChange}
                        required
                    >
                        {customersFetched.map(customer => (
                            <option key={customer.value} value={customer.value}>
                                {customer.display}
                            </option>
                        ))}
                    </select>
                </div>

                <Button className=" ant-btn btn-success ant-btn-primary float-right "
                        onClick={this.onSubmit}>
                   Create Project
                </Button>

                <Button className=" ant-btn btn-success ant-btn-primary ant-btn-gray float-right"
                        onClick={this.onCancel} >
                    Cancel
                </Button>
            </div>
        );

    }
}

export default AddProject;