<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Task;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index(){
        $tasks = Task::all();

        return $tasks->toJson();

    }

    public function store(TaskRequest $request) {
        try {
            $newTask = new Task;
            $newTask->name = $request->name;
            $newTask->time = $request->time;

            $newTask->save();

            return new JsonResponse(["ok" => "true", "message" => "New task created.", "id" => $newTask->id]);
        }
        catch (Exception $ex) {
            //error_log($ex);
            return new JsonResponse(["ok" => "false", "message" => $ex->getMessage()]);
        }
    }

    public function update(Request $request) {
        $rules = array(
            'id' => 'required',
            'name' => 'required|string|',
            'time' => 'required|string',
        );

        //$validator = Validator::($request, $rules);
        $validData = $request->validate($rules);

        try {
            $task = Task::find($request->id);
            $task->time = $request->time;
            $task->save();

            return new JsonResponse(["ok" => "true", "message" => "Task updated."]);
        }
        catch(Exception $ex){
            return new JsonResponse(["ok" => "false", "message" => $ex->getMessage()]);
        }



    }

    public function show($id) {

    }
}
