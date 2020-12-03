import React, {Component} from 'react';
import Progress from "./Progress";

import PresaleServices from '../Services/Api/Api'
import {Redirect} from 'react-router-dom'
import './style.scss'
import Projects from './Projects'
import Pagination from "../Common/Pagination";

class Index extends Component {
    constructor(props) {
        super(props);
        let loggedIn = null;
        this.state = {
            loggedIn,
            data: [],
            loading: true,
            taskInProgress: null,
            taskComplete: null,
            ProjectComplete: null,
            name: this.props.name,
            company_name: this.props.company_name,
            token:this.props.token,
            project_data:[],
            filtered:[],
            searched:[],
            searching:false,
            itemsPerPage:5,
            currentPage: 1,
        };

        if(this.state.token!==""&&this.state.token!==undefined) {
            this.state.loggedIn = true;
        }

        this.props.setLocation(this.props.history.location.pathname)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.name !== this.state.name || this.props.company_name !== this.state.company_name) {
            this.setState({
                name: this.props.name,
                company_name: this.props.company_name
            })

        }
    }
    onChangeHandler = e => {
        e.preventDefault();

        const {data, searched,itemsPerPage,project_data} = this.state;
        const currentPage=1;
        let value = e.target.value;
        if(e.target.type==="date"){
            let temp=value.split("-")
            temp=temp.reverse();
            value=temp.join('/')
        }
        let filtered = [...project_data];
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
        const { currentPage, itemsPerPage} = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        let currentFiltered;
        PresaleServices.getProjectStatus()
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false,
                    project_data:response.data.Project_Data
                },()=>{
                        if(this.state.project_data){
                            const temp = [...this.state.project_data];
                            currentFiltered = temp.slice(
                                indexOfFirstItem,
                                indexOfLastItem
                            );
}
                        else {
                            currentFiltered=[]
                        }
                    this.setState({filtered: currentFiltered});                    
                    console.log('hello filter');
                    console.log(currentFiltered);
                })

            }).catch(err => console.log(err))


    }
    paginate = pageNumber => {
        const {project_data,itemsPerPage} = this.state;
        const indexOfLastItem = pageNumber * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const temp = [...project_data];
        const currentFiltered = temp.slice(indexOfFirstItem, indexOfLastItem);
        this.setState({currentPage: pageNumber, filtered: currentFiltered});
    };
//token
    render() {
        const {loggedIn} = this.state;
        if (loggedIn === false || loggedIn === null) {
            return <Redirect to="/"/>;
        }
        const {data, loading,project_data,searching,itemsPerPage,filtered} = this.state;
        return <div>
            <section className="dashboard-section">
                <div className="container mt-4">

                    <Progress progress={data.Total_Projects} complete={data.Tasks_Completed}
                              total={data.Tasks_In_Progress} loading={loading}/>

                    <div className="row">
                        <div className="col-md-12 ">
                            <card className="row ant-card ant-card-bordered my-3 p-3">
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        name="name"
                                        placeholder="Search Project"
                                        onChange={this.onChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="col-md-3 offset-md-5">
                                    {this.props.canCreateProject?<button className="ant-btn ant-btn-primary float-right" onClick={()=>this.props.history.push('/AddProject')}>
                                      Add Project
                                    </button>:null}
                                </div>
                            </card>
                        </div>
                    </div>
                    <Projects loading={loading} data={filtered}
                              canWrite={this.props.canWrite} history={this.props.history}
                              token={this.props.token}
                    />
                    <div className="col-md-12 p-0">
                        <card className="d-block text-center ant-card ant-card-bordered my-3 p-3">
                    {!searching?

                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={project_data?project_data.length:0}
                            paginate={this.paginate}
                        />:null}
                        </card>
                    </div>
                </div>
            </section>
        </div>
    }
}

export default Index
