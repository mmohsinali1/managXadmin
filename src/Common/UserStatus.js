import React, {Component} from 'react'
import 'antd/dist/antd.css'
import socketio from 'socket.io-client';
import Echo from "laravel-echo";
import axios from 'axios'
import {Modal,Button} from "antd";
import {withRouter} from "react-router"
import mp3_file from './tune.mp3';
import PresaleServices from "../Services/Api/Api";
class UserStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myId: this.props.id,
            callVisible: false,
            options: {
                client: socketio,
                broadcaster: 'socket.io',
                host: window.location.hostname + ':5555', // this is laravel-echo-server host
                forceTLS: true,
                encrypted: false,
                //authEndpoint is your apiUrl + /broadcasting/auth
                authEndpoint: "/broadcasting/auth",
                // As I'm using JWT tokens, I need to manually set up the headers.
                auth: {
                    headers: {
                        'Authorization': "Bearer " + this.props.token,
                        Accept: "application/json"
                    }
                }
            }, api: {
                Authorization: "Bearer " + this.props.token
            },
            callFrom: '',
            redirect: false,
            audio : new Audio(mp3_file),
            btnLoading:false,
            room:'',
            project:''
        }
        this.state.audio.loop = true;
    }

    handleOk = e => {
        e.preventDefault()
        this.setState({
            callVisible: false
        });
        // return  <a href={'/video'}/>
    };

    calling = () => {
        const {api, room,audio} = this.state;
        this.setState({
            btnLoading:true
        })
        axios.put('/api/acceptcall/' + room, null, {headers: api})
            .then(

            () => {
                this.setState({
                    callVisible: false,
                    btnLoading:false

                })

                if(!this.state.window||this.state.window.closed) {
                    if(this.state.callFrom){
                    let url = "/#/openvideo/" + this.state.room + "/" + this.state.callFrom+'/admin'
                    const iframe = '<html><body style="margin:0" class="iframe-body"><iframe width="100%" height="100%" frameborder="none" src="' + url + '" ></iframe></body></html>';
                    const win = window.open(url, "Video", "width=900px,height=900px,toolbar=no,menubar=no,resizable=yes");
                    let timer = setInterval(function () {
                        if (win.closed) {
                            clearInterval(timer);
                            console.log("popup closed")
                        }
                    }, 1000);
                  //  win.document.write(iframe);
                    this.setState({
                        window: win
                    })
                    audio.pause()
                    audio.currentTime = 0;
                }}
            })
    }


    handleCancel = () => {

        const {api, room,audio} = this.state
        axios.put('/api/rejectcall/' + room, null, {headers: api}).then(
            () => {
                this.setState({
                    callVisible: false,
                    btnLoading:false

                }, () => {
                    audio.pause()
                    audio.currentTime = 0;

                })
            })
    };
    push = () => {
        this.setState({
            callVisible: false
        });
    };

    componentDidMount() {

        const echo = new Echo(this.state.options);
        const {api} = this.state
        const {myId} = this.state;
        if (myId !== -1) {
            echo.private('startchat.' + myId)
                .listen('TestEvent', e => {
                    let project=e.room.split('_')
                    this.setState({
                        room: e.room,
                        callFrom: e.name,
                        project:project[1]
                    })
                }).on('error', (e) => {
                console.log("error:")
                console.error(e)
            });
        }
        echo.join("chat").joining((user) => {

            axios.put('/api/user/' + user.id + '/online', null, {headers: api});

        })
            .leaving((user) => {
                axios.put('/api/user/' + user.id + '/offline', null, {headers: api});

            })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id !== this.props.id && this.props.id !== -1) {
            const echo = new Echo(this.state.options);
            const myId = this.props.id;
            const {audio}=this.state
            echo.private('startchat.' + myId)
                .listen('TestEvent', e => {
                    if(this.props.token) {
                        let project=e.vcall.room.split('_')

                        PresaleServices.getName().then(
                            this.setState({
                                callVisible: true,
                                callFrom: e.name,
                                room: e.vcall.room,
                                project:project[1]
                            }, () => audio.play())
                        )

                    }
                }

                ).listen('EndCall', e => {

                this.setState({
                    callVisible: false,
                })
                audio.pause()
                audio.currentTime = 0;
            })
                .on('error', (e) => {
                    console.log("error:")
                    console.error(e)
                });

        }
    }

    render() {

const {btnLoading}=this.state;
        return <div>

            <Modal
                title="Video Call From..."
                visible={this.state.callVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
            >



                <div className="text-center">
                    <h4 className="text-center">{this.state.callFrom}</h4>
                    <h4 className={"text-center"}>{this.state.project}</h4>
                    {/*  <p onClick={this.push}>
                        <Link  to={'/video'} > Video Call</Link></p>*/}
                    <Button loading={btnLoading} href="javascript:void(0)" onClick={this.calling} className="ant-btn  ant-btn-primary m-2">Accept
                        Call</Button>
                    <a href="javascript:void(0)" onClick={this.handleCancel}
                       className="ant-btn ant-btn-primary ant-btn-gray m-2">Cancel Call</a>
                </div>
            </Modal>
        </div>
    }
}
;
export default withRouter(UserStatus)
