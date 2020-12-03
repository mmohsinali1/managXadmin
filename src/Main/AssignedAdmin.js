import React, {Component} from 'react'
import {Spin} from "antd";

class AssignedAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: this.props.users
        }
    }

componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.users!==this.props.users){
            this.setState({
                users:this.props.users
            })
        }
}

    render() {

        const {users,} = this.state;
        let myUser = users&&users.length ? users.map(e => {
            return <div className="user-info">
                <div className="user-name">{e.name}</div>


            </div>
        }) : <p>No admin is assigned</p>;
        const v = (this.props.loaded?
            <div className="user-status-wrapper"> {myUser}
            </div>:<Spin size={"large"}/>
        )


        return v

    };
}

export default AssignedAdmin
