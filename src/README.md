# Time Tracker

The application is created with Laravel, React and MySQL.

#### Run Without Docker
To be able to run the application without using Docker you need: 
- PHP >= 7.4
- Composer
- MySQL 
- Node >= 10
- NPM

First of all, copy the contents of ```src/.env.local``` file to ```src/.env```.
Then, in the project directory, execute the following commands:
```sh
$ cd src/
$ composer install
$ npm install
$ npm run dev
$ php artisan migrate
$ php artisan serve
```

If you get an error when running the ```php artisan migrate``` command because the database does not exist, run the next command: ```php artisan db:create``` 

Open up your browser and go to http://localhost:8000 and you should see the App runing. Make sure that MySQL service is running.   
 
#### Run With Docker
To be able to run the application with using Docker you need: 
- Docker
- Docker compose

First of all, copy the contents of ```src/.env.docker``` file to ```src/.env```.
Then, in the project directory, execute the following commands:
(You can run it without sudo if your user has permission)
```sh
$ sudo docker-compose build
$ sudo docker-compose up -d
$ sudo docker-compose run --rm composer install
$ sudo docker-compose run --rm npm run dev
$ sudo docker-compose run --rm artisan migrate
$ sudo docker-compose exec nginx chmod -R 777 /var/www/html/storage
```

The command ```sudo docker-compose exec nginx chmod -R 777 /var/www/html/storage``` should not be used in a real world app but for this demonstration makes it easier to run the application. 

Open up your browser and go to http://localhost:8080 and you should see the App runing.

### Extra Commands

3 optional commands have been created to view, create and finish tasks.

If you're not using Docker you have to run them in the ```src/``` directory and in each command type: ```php artisan {command}```

If you're using Docker you have to run: ```sudo docker-compose run --rm artisan {command}```

The commands are: 
- ```tasks show``` : This command will display all tasks and their total time.
- ```task start {name}```: This command will create a new task with the name indicated on the {name} param. 
- ```task end {name}```: This command will end a existing task with the name indicated on the {name} param.
