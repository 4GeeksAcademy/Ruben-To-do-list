import { useState, useEffect } from "react";
import React from "react";


const ToDoList = () => {

	const [tareas, setTareas] = useState([])
	const [nuevaTarea, setNuevaTarea] = useState("")

	function cambioInput(e) {
		setNuevaTarea(e.target.value)
	}

	function anadirTarea(e) {
		if (nuevaTarea.trim() == "" || e.key != "Enter" && e.type != "click") {
			return
		}
		setTareas([...tareas, nuevaTarea])
		setNuevaTarea("");
		
	}

	function borrarTarea(index) {
		const tareasActualizadas = tareas.filter((_, indice) => indice !== index)
		setTareas(tareasActualizadas);
	}

	return (
		<div className="container mx-auto text-center">
			<h1 className="title">To Do List</h1>
			<div className="w-100 mx-auto d-flex justify-content-center">
				<input className="w-50 mx-1" type="text" placeholder="Añade una tarea" value={nuevaTarea} onChange={cambioInput} onKeyDown={(e)=>anadirTarea(e)}/>
				<button className="btn btn-success" onClick={(e)=>anadirTarea(e)}>Añadir</button>
			</div>
			<ul>
				{tareas.map((task, taskIndex) =>
					<li key={taskIndex} className="">
						<span>{task}</span>
						<div>
							<button className="btn btn-danger" onClick={() => borrarTarea(taskIndex)}>Borrar</button>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};

export default ToDoList;