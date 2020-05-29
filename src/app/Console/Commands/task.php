<?php

namespace App\Console\Commands;

use App\Task as AppTask;
use DateTime;
use Exception;
use Illuminate\Console\Command;

class task extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'task {action?} {name?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $arg = $this->argument('action');
        $name = $this->argument('name');
        if ($name !== null) {
            if ($arg == 'start') {
                $this->start($name);
            }
            else if ($arg == 'end') {
                $this->end($name);
            }
        }
        else {
            echo 'Task name is required';
        }
    }


    private function start($name) {
        try {
            $t = AppTask::where('name', '=', $name)->get();
            if (count($t) == 0) {
                $newTask = new AppTask();
                $newTask->name = $name;
                $newTask->time = '0:0:0';

                $newTask->save();

                echo "New task created";
            }
            else {
                echo "The task already exists";
            }
        }
        catch (Exception $ex) {
            echo "Error when creating the task: " . $ex->getMessage();
        }
    }

    private function end($name) {
        try {
            $t = AppTask::where('name', '=', $name)->first();
            if ($t != null) {
                $endDate = new DateTime();
                $startDate = $t->created_at;

                $diff = $startDate->diff($endDate);

                $t->time = $diff->h . ':' . $diff->i . ':' . $diff->s;

                $t->save();

                echo "Task updated";
            }
            else {
                echo "The task not exists";
            }
        }
        catch (Exception $ex) {
            echo "Error when update: " . $ex->getMessage();
        }
    }
}
