import React, {Component} from 'react';
import {Card, Collapse, Progress, Spin, Upload, message} from "antd";
import {UploadOutlined} from '@ant-design/icons'
import PresaleServices from '../Services/Api/Api'
import cookie from "react-cookies";
import {DownCircleOutlined, UpCircleOutlined} from '@ant-design/icons';
import AssignedAdmin from  './AssignedAdmin'
const {Panel} = Collapse;

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        Authorization: cookie.load('admin_token')
    },

};
const GenExtra = (props) => (
    !props.collapsed ?
        <DownCircleOutlined style={{fontSize: '23px', color: '#b1c63d'}}
        /> :
        <UpCircleOutlined style={{fontSize: '23px', color: '#b1c63d'}}
        />
);
const MyProject = (props) => {

    return <div>{
        props.data && props.data.map(e => {
            return <div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {e.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })
    }</div>
}
const ProjectComp = (props) => {
    console.log('props')
    console.log(props);
    localStorage.setItem('QuationPage','Admin')
    const canWrite = props.canWrite;
    const history = props.history;
    const token = props.token;
    const ref_no = props.ref_no;
    
    return <div>{
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-2">
                        {props.name}
                    </div>
                    <div className="col-md-2">
                        <div className="small">Expected Completion Date</div>
                        {props.due_date}
                    </div>
                    <div className="col-md-3">
                        <div className="small">Progress</div>
                        {props.percentage !== "" ?
                            <Progress strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }} percent={props.percentage}
                                      className="m-0 custom-space g"
                                      status="active"
                            />: null
                        }
                    </div>

                    <div className="col-md-2">
                        {props.percentage === 100 ? (

                            <Upload name={'file'}
                                    action={'/api-gateway/admin/uploadprojectfile/' + props.name}
                                    headers={{
                                        Authorization: token
                                    }}
                                    onChange={props.changeFile}

                            >
                                <a >
                                    <UploadOutlined/> Upload report
                                </a>
                            </Upload>
                        ) : null

                        }
                    </div>
                    <div className="col-md-2">
                        {canWrite ?                        
                        <div>                            
                            <a className="font-weight-bolder" style={{color: "#85c63d", fontSize: 15}}
                                       onClick={e => {
                                           e.stopPropagation()
                                           history.push(`/Resource/${ref_no}`)
                                       }}>
                                Assign Resource
                            </a>
                            <br />
                            {ref_no.substring(0, 2)==='OT' || ref_no.substring(0, 2)==='CS'?
                            <a className="font-weight-bolder" style={{color: "#85c63d", fontSize: 15}}                                    
                                    href={'https://managex.ae/#/edit/'+ref_no}
                                    >
                                Review SOW
                            </a>:''}
                            
                        </div> 
                            
                            : null
                        }

                    </div>
                </div>
            </div>
        </div>

    }</div>

}

class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            percentage: [],
            projectData: [],
            fetching: false,
            first: true,
            collapsed: [],
            due_date: [],
            users:[],
            loaded:false
        };

    }
     changeFile=(info) =>{
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }


    onChange = (key) => {

        let {collapsed} = this.state
        if (key === undefined) {
            collapsed = []
        } else {
            collapsed = []
            collapsed[key] = true
        }
        this.setState({
            collapsed: collapsed
        })
        if (key !== undefined) {
            this.setState({
                fetching: true
            });
            PresaleServices.getStatusKey(key).then(res => {              

                    const {percentage, due_date} = this.state
                    percentage[key] = res.percentage
                    due_date[key] = res.due_date

                    this.setState({
                        projectData: res.tasks,
                        users:res.users,
                        fetching: false,
                        percentage: percentage,
                        due_date: due_date,
                        loaded:true

                    })

                }
            ).catch(err => console.log(err))
        }

    };


    render() {
        //console.log(this.props);
        let {fetching, projectData, percentage, due_date,users} = this.state;

        const {loading} = this.props;
        let view = <Collapse
            accordion={true}
            onChange={this.onChange}

        >
            {
                this.props.data && this.props.data.map((e) => {
                    //console.log(e);
                    return <Panel showArrow={false}
                                  header={<ProjectComp id={e.key} ref_no={e.ref_no}  name={e.name} due_date={due_date[e.key] ?
                                      due_date[e.key] : ''


                                  } percentage={e.key in percentage ?
                                      percentage[e.key] : ''}
                                                       canWrite={this.props.canWrite}
                                                       history={this.props.history}
                                                       changeFile={this.changeFile}
                                                       token={this.props.token}

                                  />
                                  }
                                  key={e.key} extra={<GenExtra collapsed={e.key in this.state.collapsed}/>}>

                        <div className="row">
                            <div className="col-md-8">
                                {
                                    fetching ? <Spin size="large" className="ml-5"/> :
                                        <div>
                                            <MyProject data={projectData}
                                            />
                                        </div>

                                }
                            </div>
                            <div className="col-md-4">
                                {/*<AssignedAdmin users={users} loaded={this.state.loaded}/>*/}
                            </div>
                        </div>
                    </Panel>
                })
            }
        </Collapse>;
        return (
            <div className="row ">
                <div className="col-md-12 ">
                    <Card loading={loading}>
                        {view}
                    </Card>
                </div>
            </div>
        );
    }
}

export default Projects
