<?php

namespace App\Console\Commands;

use App\Task;
use Illuminate\Console\Command;

class tasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks {action?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Shows all the tasks';

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
        if ($arg == 'show') {
            $this->show();
        }
        else {
            echo 'Action required';
        }
    }


    private function show() {
        $tasks = Task::all();
        echo "\nTASKS:\n";
        for ($i=0; $i < count($tasks) ; $i++) {
            $task = $tasks[$i];
            $str = '';

            $str = $task['name'] . " " . $task['time'] . "\n";

            echo $str;
        }
        echo "\n";
    }

}
