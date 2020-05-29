import React, { Component } from 'react'
import TaskList from './TaskList';
import TaskNew from './TaskNew';;
import TaskCurrent from './TaskCurrent';
import { AppService } from '../services/app-service';


export default class TaskDashboard extends Component {

    constructor() {
        super();

        this.state = {
            currentTask: null,
            tasks: [],
            isLoading: true,
        }

        this.setCurrentTask = this.setCurrentTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.loadTasks = this.loadTasks.bind(this);
    }

    componentDidMount() {
        this.loadTasks();
    }

    loadTasks() {
        let s = new AppService();
        s.getAllTasks().then((data) => {
            this.setState({
                tasks: data,
                isLoading: false,
            });
        }).catch((err) => {
            alert("Error in obtaining the tasks from the database:\n" + err.responseText);
        });
    }

    setCurrentTask(task) {
        let curTasks = this.state.tasks;

        let exists = false;
        curTasks.forEach((t) => {
            if (t.name == task.name) {
                exists = true;
            }
        })
        if (!exists) {
            //To server
            let s = new AppService();
            s.addTask(task).then((response) => {
                task.id = response.id;
                curTasks.push(task);
                this.setState({
                    currentTask: task,
                    tasks: curTasks,
                });
            }).catch((err) => {
                alert("Error saving the task to the server:\n" + err.responseJSON.message);
            });
        }
        else {
            this.setState({
                currentTask: task,
            });
        }
    }

    updateTask(task, timer) {
        let curTasks = this.state.tasks;
        let taskToUpdate = null;
        curTasks.forEach((t) => {
            if (t.name == task.name) {
                t.seconds = t.seconds + timer.seconds;
                if (t.seconds >= 60) {
                    t.seconds = Math.abs(60 - t.seconds);
                    t.minutes += 1;
                }

                t.minutes = t.minutes + timer.minutes;
                if (t.minutes >= 60) {
                    t.hours += 1;
                    t.minutes = Math.abs(60 - t.minutes);
                }

                t.hours = t.hours + timer.hours;

                taskToUpdate = t;
            }
        });


        if (taskToUpdate != null) {
            //Asyn save;
            let s = new AppService();
            s.updateTask(taskToUpdate).then(() => {
                this.loadTasks();
            }).catch((err) => {
                alert("Error updating the task to the server:\n" + err.responseJSON.message);
            })
        }
    }

    render() {

        if (this.state.isLoading) {
            return (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }


        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 col-md-10 offset-md-1">
                        <div className="card">
                            <div className="card-header">New Task</div>

                            <div className="card-body">
                                <TaskNew onAddTask={this.setCurrentTask}></TaskNew>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 col-md-10 offset-md-1">
                        <div className="card">
                            <div className="card-header">Current Task</div>

                            <div className="card-body">
                                <TaskCurrent task={this.state.currentTask} onStopTimer={this.updateTask}></TaskCurrent>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 col-md-10 offset-md-1">
                        <div className="card">
                            <div className="card-header">Tasks</div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <TaskList tasks={this.state.tasks} setCurrentTask={this.setCurrentTask}></TaskList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
