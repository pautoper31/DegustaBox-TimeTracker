import React, { Component } from 'react'



export default class TaskList extends Component {

    constructor(props) {
        super(props);

        this.onClickResume = this.onClickResume.bind(this);
    }

    componentDidMount() {

    }

    onClickResume(task) {
        if (this.props.setCurrentTask != null) {
            this.props.setCurrentTask(task);
        }
    }

    render() {

        const tasks = this.props.tasks;
        let taskEl = [];
        tasks.forEach((element, index) => {
            let t = <TaskRow key={index} task={element} index={index} onClickResume={this.onClickResume} />
            taskEl.push(t);
        });

        return (
            <table className="table table-striped ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Started at</th>
                        <th scope="col">Ended at</th>
                        <th scope="col">Total Time</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {taskEl}
                </tbody>
            </table>
        )
    }
}


class TaskRow extends Component {

    constructor(props) {
        super(props);

        this.onClickResume = this.onClickResume.bind(this);
    }

    onClickResume() {
        if (this.props.onClickResume != null) {
            this.props.onClickResume(this.props.task);
        }
    }

    render() {
        let task = this.props.task;

        let startTime = new Date(task.created_at);
        startTime = startTime.toLocaleDateString() + " " + startTime.toLocaleTimeString();

        let endTime = '';new Date();
        if (task.updated_at != '') {
            endTime = new Date(task.updated_at);
            endTime = endTime.toLocaleDateString() + " " + endTime.toLocaleTimeString();
        }


        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{task.name}</td>
                <td>{startTime}</td>
                <td>{endTime}</td>
                <td>{task.hours} : {task.minutes} : {task.seconds}</td>
                <td>
                    <button className="btn btn-sm btn-outline-success" data-toggle="tooltip" data-placement="top" title="Resume Task" onClick={this.onClickResume}>
                        <svg className="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg>
                    </button>
                </td>
            </tr>
        )
    }
}
