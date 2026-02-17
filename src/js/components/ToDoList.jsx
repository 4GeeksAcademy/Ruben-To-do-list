import { useState} from "react"; // ⚠️ SUGERENCIA: Agregar React import explícito

// 📝 REVISOR: Considera usar nombres en inglés (tasks, newTask) - Estándar internacional
const ToDoList = () => {

	const [tareas, setTareas] = useState([]) // ⚠️ MEJOR: const [tasks, setTasks] = useState([])
	const [nuevaTarea, setNuevaTarea] = useState("") // ⚠️ MEJOR: const [newTask, setNewTask] = useState("")

	// 💡 MEJOR NOMBRE: const handleInputChange = (e) => { ... }
	function cambioInput(e) {
		setNuevaTarea(e.target.value)
	}

	function anadirTarea(e) {
		// ❌ CRÍTICO: Usar === y !== en lugar de == y !=
		// DEBE SER: if (nuevaTarea.trim() === "" || e.key !== "Enter" && e.type !== "click") {
		// ⚠️ También: Separar validaciones para mejor legibilidad
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

	// ⚠️ IMPORTANTE: Este mapeo debe estar en un componente separado "TodoItem"
	// 💡 TAMBIÉN: Usar ID único en lugar de índice como key
	const taskList = tareas.map((task, taskIndex) =>
		<li key={taskIndex} className="w-100"> {/* ⚠️ key={task.id} sería mejor */}
			<span>{task}</span>
			<div className="d-flex justify-content-end px-2">
				<button className="btn btn-danger" onClick={() => borrarTarea(taskIndex)}>Borrar</button>
			</div>
		</li>
	)

	return (
		<div className="container mx-auto text-center">
			<h1 className="title">To Do List</h1>
			{/* ⚠️ IMPORTANTE: El input debería estar en componente separado "TodoInput" */}
			<div className="w-100 mx-auto d-flex justify-content-center">
				<input className="w-50 mx-1" type="text" placeholder="Añade una tarea" value={nuevaTarea} onChange={cambioInput} onKeyDown={(e) => anadirTarea(e)} />
				<button className="btn btn-success" onClick={(e) => anadirTarea(e)}>Añadir</button>
			</div>
			<ul className="w-50 mx-auto p-0">
				{tareas.length === 0 ? <span className="conditionalText fs-2">No hay tareas, añadir tareas</span> : taskList}
			</ul>
		</div>
	);
};

export default ToDoList;