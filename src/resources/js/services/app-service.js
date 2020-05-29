
export class AppService {
    constructor() {

    }

    addTask(task) {
        console.log(`adding new task: ${task.name}`);


        let p = new Promise((resolve, reject) => {
            let data = {
                name: task.name,
                time: `${task.hours}:${task.minutes}:${task.seconds}`,
            }
            $.ajax({
                method: 'POST',
                data: data,
                url: '/api/tasks',
                error: function (err) {
                    console.log(err);
                    reject(err);
                },
                success: function (response) {
                    console.log(response);
                    resolve(response);
                }
            });
        });

        return p;

    }

    updateTask(task) {
        console.log(`updating new task:`);

        task.time = `${task.hours}:${task.minutes}:${task.seconds}`;
        delete task.minutes;
        delete task.hours;
        delete task.seconds;
        console.log(task);

        let p = new Promise((resolve, reject) => {
            $.ajax({
                method: 'PUT',
                url: '/api/tasks',
                data: task,
                error: function (err) {
                    console.log(err);
                    reject(err);
                },
                success: function (response) {
                    console.log(response);
                    resolve(response);
                }
            });
        });
        return p;
    }

    getAllTasks() {
        let p = new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: '/api/tasks',
                error: function (err) {
                    console.log(err);
                    reject(err);
                },
                success: function (response) {
                    let data = [];
                    response = JSON.parse(response);

                    response.forEach(element => {
                        let time = element.time;
                        let h = time.substring(0, time.indexOf(':'));
                        let m = time.substring(time.indexOf(':') + 1, time.lastIndexOf(':'));
                        let s = time.substring(time.lastIndexOf(':') + 1);

                        element.hours = Number(h);
                        element.minutes = Number(m);
                        element.seconds = Number(s);

                        data.push(element);
                    });

                    resolve(data);
                }
            });
        });
        return p;
    }
}
