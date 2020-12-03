import React, { Component } from 'react';
import {Avatar, Card, Menu,Collapse} from "antd";

const { Panel } = Collapse;

const genExtra = () => (
    <SettingOutlined
        onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
        }}
    />
);
class Task extends Component {

    render() {
        const {loading}=this.props;
        return (
            <div className="row ">
                <div className="col-md-12 ">
                    <Collapse
                        showArrow={false}
                        onChange={callback}
                    >
                        <Panel showArrow={false} header="This is panel header 1" key="1" extra={genExtra()}>
                            <div>{text}</div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        );
    }
}

export default  Task