import PropTypes from "prop-types"

function TaskList({ tasks, deleteTaskFunction, completeTaskFunction }) {

	const tasksOutput = tasks.map((task, taskIndex) =>
		<li key={task.id} className={task.finished ? "completedTask" : ""}>
			<input
				type="checkbox"
				className="ms-3"
				onChange={() => completeTaskFunction(taskIndex)}
				checked={task.finished && "checked"}
			></input>
			<span>{task.value}</span>
			<div className="d-flex justify-content-end px-2">

				<button className="btn btn-danger" onClick={() => deleteTaskFunction(taskIndex)}>Borrar</button>
			</div>
		</li>
	)

	const conditionalText = (
		<div className="conditionalText">
			<p className="fs-2">No tienes tareas pendientes</p>
			<p className="conditionalText fs-3">Añade tus tareas pendientes arriba, o ves a jugar!</p>
		</div>
	)

	const tasksReturn = tasks.length === 0 ? conditionalText : tasksOutput

	return (
		<ul className="w-50 mx-auto p-0">
			{tasksReturn}
		</ul>
	)

}

TaskList.propTypes = {
	tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
	deleteTaskFunction: PropTypes.func.isRequired,
	completeTaskFunction: PropTypes.func.isRequired
};

export default TaskList;

