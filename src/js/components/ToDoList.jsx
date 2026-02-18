import { useState, useEffect } from "react";
import ToDoInput from "./ToDoInput";
import TaskList from "./TaskList";


function ToDoList() {

	const [newTask, setNewTask] = useState("")
	const [tasks, setTasks] = useState(() => {

		const saved = localStorage.getItem('tasks');
		return saved ? JSON.parse(saved) : [];

	})

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	function idGeneration() {
		let part1 = Date.now().toString(30);
		let part2 = Math.random().toString(30).substring(2);

		return part1 + part2;
	}

	function changeInput(e) {
		setNewTask(e.target.value)
	}

	function addTask(e) {

		if (e.key !== "Enter" && e.type !== "click") {
			return
		}
		if (newTask.trim() === "") {
			return
		}

		let taskToAdd = {
			"value": newTask,
			"finished": false,
			"id": idGeneration()
		}

		setTasks([...tasks, taskToAdd])
		setNewTask("");

	}

	function deteleTask(index) {
		const taskActualizadas = tasks.filter((_, indice) => indice !== index)
		setTasks(taskActualizadas);
	}

	function completeTask(index) {
		const task = tasks[index]
		const taskList = [...tasks]


		if (task.finished) {
			task.finished = false

			taskList[index] = task;
			setTasks(taskList);
			return
		}

		task.finished = true

		taskList[index] = task;
		setTasks(taskList);

	}

	return (
		<div className="container mx-auto text-center">
			<h1 className="title">To Do List</h1>
			<ToDoInput inputValue={newTask} onChangeFunction={changeInput} addTaskFunction={addTask} />
			<p>Total de tareas: {tasks.length}</p>
			<TaskList tasks={tasks} deleteTaskFunction={deteleTask} completeTaskFunction={completeTask} />
		</div>
	);
};

export default ToDoList;