import React, { Component } from 'react'
import Timer from './Timer';



export default class TaskCurrent extends Component {

    constructor(props) {
        super(props);

        this.onStopTimer = this.onStopTimer.bind(this);
    }

    componentDidMount() {

    }

    onStopTimer(timer) {
        console.log("timer stoped");
        console.log(timer);

        if (this.props.onStopTimer != null) {
            this.props.onStopTimer(this.props.task, timer);
        }
    }


    render() {

        let ret = '';

        if (this.props.task != null) {
            const task = this.props.task;
            ret = (
                <div className="text-center">
                    <h3>{task.name}</h3>
                    <Timer onStop={this.onStopTimer}></Timer>
                </div>);
        }
        else {
            ret = <p>Any current task...</p>
        }

        return ret;
    }
}
