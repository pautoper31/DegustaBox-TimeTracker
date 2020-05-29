import React, { Component } from 'react'
import { AppService } from '../services/app-service';



export default class TaskNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleAddNewTask = this.handleAddNewTask.bind(this);
    }

    componentDidMount() {

    }

    handleFieldChange(event) {
        this.setState({
            name: event.target.value,
        })
    }

    handleAddNewTask() {
        if (this.state.name != '') {
            let task = {
                name : this.state.name,
                seconds: 0,
                minutes: 0,
                hours: 0,
                created_at : new Date(),
                updated_at : '',
            }

            if (this.props.onAddTask !== null) {
                this.props.onAddTask(task);
            }

        }
    }

    render() {
        return (
            <div className='input-group'>
                <input
                    type='text'
                    name='name'
                    className='form-control'
                    placeholder='Task name'
                    value={this.state.name}
                    onChange={this.handleFieldChange}
                />
                <div className='input-group-append'>
                    <button className='btn btn-primary'  onClick={this.handleAddNewTask}>Start</button>
                </div>
            </div>
        )
    }
}
