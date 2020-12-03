import React, {Component} from 'react';

import {Card} from 'antd';

const data = [
    {
        title: "Title 1"
    },
    {
        title: "Title 2"
    },
    {
        title: "Title 3"
    },

];

class Progress extends Component {

    render() {
        const {progress,total,complete,loading}=this.props;
        return (
            <div className="row">
                <div className="col-md-4">
                    <Card loading={loading}>
                        <img src="images/in-progress.png" alt="Projects In-Progress"/>
                        <div className="summary-info">
                            <p>Projects In-progress</p>
                            <h2 className="blue-text">{progress}</h2>
                        </div>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card loading={loading}>
                        <img src="images/completed.png" alt="Project Completed"/>
                        <div className="summary-info">
                            <p>Completed Tasks</p>
                            <h2 className="green-text">{complete}</h2>
                        </div>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card loading={loading}>
                        <img src="images/task-inprogress.png" alt="Tasks Progress"/>
                        <div className="summary-info">
                            <p>Tasks In-Progress</p>
                            <h2 className="yellow-text">{total}</h2>
                        </div>

                    </Card>
                </div>

            </div>
        )


    }
}

export default Progress
