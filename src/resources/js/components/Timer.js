import React, { Component } from 'react'
import { addNewTask } from '../services/app-service';


export default class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: 0,
            hours: 0,
            time: null,
            isRunning: false,
        }

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.pause = this.pause.bind(this);
        this.time = this.time.bind(this);
    }

    time() {

        let startTime = this.state.time;
        let curTime = new Date();

        let diff = curTime - startTime;

        let seconds = Math.floor((diff / 1000) % 60);
        let minutes = Math.floor((diff / 1000 / 60) % 60);
        let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

        this.setState({
            seconds: seconds,
            minutes: minutes,
            hours: hours,
            isRunning: true,

        })

    }

    start() {
        if (this.state.isRunning == false) {
            this.setState({
                time: new Date(),
            })
            //Set interval
            this.timer = setInterval(() => {
                this.time();
            }, 1000);

            if (this.props.onStart != null) {
                this.props.onStart();
            }
        }
    }


    pause() {
        if (this.state.isRunning == true) {

            clearInterval(this.timer);

            this.setState({
                isRunning: false,
            })

            if (this.props.pause != null) {
                this.props.pause();
            }
        }

    }

    stop() {
        if (this.state.isRunning == true) {
            this.pause();
            if (this.props.onStop != null) {
                this.props.onStop(this.state);
            }
        }
    }

    reset() {
        clearInterval(this.timer);
        this.setState({
            seconds: 0,
            minutes: 0,
            hours: 0,
            time: null,
            isRunning: false,
        })
        if (this.props.onReset != null) {
            this.props.onReset();
        }
    }



    render() {



        return (
            <div>
                <div className="">
                    <h1>{this.state.hours} : {this.state.minutes} : {this.state.seconds}</h1>
                </div>
                <div>
                    <button className="btn btn-outline-success" onClick={this.start} data-toggle="tooltip" data-placement="top" title="Play/Pause">
                        <svg className="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg>
                    </button>


                    <button className="ml-3 btn btn-outline-danger" onClick={this.stop} data-toggle="tooltip" data-placement="top" title="Stop">
                        <svg className="bi bi-stop-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
                        </svg>
                    </button>

                    <button className="ml-3 btn btn-outline-info" onClick={this.reset} data-toggle="tooltip" data-placement="top" title="Reset">
                        <svg className="bi bi-arrow-clockwise" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z" />
                            <path fillRule="evenodd" d="M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
            </div>

        )
    }
}
