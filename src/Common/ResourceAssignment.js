import React, {Component} from 'react';
import {Button, message, Card} from "antd";
import PresaleServices from "../Services/Api/Api";
import {Select} from 'antd';
import 'antd/dist/antd.css';
import {Redirect} from "react-router-dom";

const {Option} = Select;

class ResourceAssignment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usersFetched: [],
            projects: [],
            selected: [],
            projectsFetched: [],
            empty: [],
            project: this.props.match.params.projectName ? this.props.match.params.projectName : "",
            loading:false
        };
        this.props.setLocation(this.props.history.location.pathname)
    }


    onSubmit = e => {
        this.setState({
            loading:true,
        });
        e.preventDefault();
        const {selected, project} = this.state
        // if (selected.length === 0) {
        //     message.error("Please select User")
        //     this.setState({
        //         loading:false,
        //     });
        // } else

            if (project === "") {
            message.error("Please select Project.")
            this.setState({
                loading:false,
            });
        } else {
            PresaleServices.assignResources(
                {
                    users: this.state.selected,
                    project: project
                }
            ).then(() => {
                message.success("Resource (s) Assigned.")
                this.setState({
                 loading:false,
                });
                this.props.history.push('/')
            }).catch(() => {
                message.error("can't assign resources.")
            })

        }
    }
    handleChange = value => {
        this.setState({
            selected: value
        })
    }

    componentDidMount() {

        PresaleServices.getUserNames().then(res => {
                localStorage.setItem("data", JSON.stringify(res))
                let projectsFetched;
                if (res) {
                    let usersFetched = res.users.map(user => {
                        return {value: user.id, display: user.name};
                    });
                    usersFetched = [].concat(
                        usersFetched
                    );

                    projectsFetched = res.projects.map(project => {
                        return {value: project.name, display: project.name, users: project.selected};
                    });
                    projectsFetched = [].concat(
                        projectsFetched
                    );


                    let users = []
                    for (let i = 0; i < usersFetched.length; i += 1) {
                        users.push(
                            <Option key={usersFetched[i].value}> {usersFetched[i].display}</Option>
                        )
                    }
                    let projects = [];

                    for (let i = 0; i < projectsFetched.length; i += 1) {
                        projects.push(
                            <Option key={projectsFetched[i].value}> {projectsFetched[i].display}</Option>
                        )
                    }
                    this.setState({
                            usersFetched: users,
                            projectsFetched: projects,
                            projects: projectsFetched,

                        },
                        () => {

                            let index = -1
                            const {projects} = this.state
                            if (this.state.projectName !== "") {
                                for (let i = 0; i < projects.length; i++) {

                                    if (this.state.project === projects[i].value)
                                        index = i
                                }
                                if (index !== -1) {
                                    const users = this.state.projects[index].users
                                    for (let i = 0; i < users.length; i++) {
                                        users[i] = users[i] + ""
                                    }
                                    this.setState({
                                        selected: users,

                                    })
                                } else {

                                    this.setState({
                                        selected: this.state.empty,

                                    })
                                }
                            }
                        }
                    )
                }

            }
        )
    }

    onChangeHandler = e => {
        let index = -1;
        const {projects} = this.state;
        for (let i = 0; i < projects.length; i++) {
            if (e === projects[i].value)
                index = i
        }
        const users = projects[index].users
        for (let i = 0; i < users.length; i++) {
            users[i] = users[i] + ""
        }
        this.setState({
            selected: users,
            project: e
        })
    }
    onCancel = () => {
        if( this.props.match.params.projectName ){
        let projectsFetched;
        const res = JSON.parse(localStorage.getItem("data"))
        let usersFetched = res.users.map(user => {
            return {value: user.id, display: user.name};
        });
        usersFetched = [].concat(
            usersFetched
        );

        projectsFetched = res.projects.map(project => {
            return {value: project.name, display: project.name, users: project.selected};
        });
        projectsFetched = [].concat(
            projectsFetched
        );


        let users = []
        for (let i = 0; i < usersFetched.length; i += 1) {
            users.push(
                <Option key={usersFetched[i].value}> {usersFetched[i].display}</Option>
            )
        }
        let projects = []

        for (let i = 0; i < projectsFetched.length; i += 1) {
            projects.push(
                <Option key={projectsFetched[i].value}> {projectsFetched[i].display}</Option>
            )
        }
        this.setState({
                usersFetched: users,
                projectsFetched: projects,
                projects: projectsFetched,

            },
            () => {

                let index = -1
                const {projects} = this.state
                if (this.state.projectName !== "") {
                    for (let i = 0; i < projects.length; i++) {

                        if (this.state.project === projects[i].value)
                            index = i
                    }
                    if (index !== -1) {
                        const users = this.state.projects[index].users
                        for (let i = 0; i < users.length; i++) {
                            users[i] = users[i] + ""
                        }
                        this.setState({
                            selected: users,

                        })
                    } else {

                        this.setState({
                            selected: this.state.empty,

                        })
                    }
                }
            }
        )}
        else {
            this.setState({
                projetName:"",
                selected:[],
                project:""
            })
        }
    }

    render() {
        const {usersFetched, projectsFetched, project, selected,loading} = this.state;
        return (
            <div className="col-md-6 offset-md-3">
                <h3 className="mt-5">Resource Assignments</h3>

                <div className="form-group">
                    <label htmlFor="Select Project">Select Project</label>
                    <Select
                        showSearch
                        className="form-control"
                        placeholder="Please select users"
                        style={{width: '100%'}}
                        defaultValue={"Please Select Project"}
                        optionFilterProp="children"
                        onChange={this.onChangeHandler}
                        filterOption={(input, option) =>
                            option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={project}
                    >
                        {projectsFetched}
                    </Select>
                </div>
                <div className="form-group">
                    <label htmlFor="Select hospital">Select Users</label>
                    <Select
                        showSearch
                        className="form-control"
                        mode="multiple"
                        optionFilterProp="children"
                        style={{width: '100%'}}
                        placeholder="Please select users"
                        onChange={this.handleChange}
                        value={selected}
                        allowClear
                        filterOption={(input, option) =>
                            option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // onSearch={this.onSearch}

                    >
                        {usersFetched}
                    </Select>
                </div>
                <Button loading={loading} className=" ant-btn btn-success ant-btn-primary float-right "
                        onClick={this.onSubmit}>
                    Assign User
                </Button>

                <Button className=" ant-btn btn-success ant-btn-primary ant-btn-gray float-right"
                        onClick={this.onCancel}>
                    Cancel
                </Button>
            </div>
        );

    }
}

export default ResourceAssignment;