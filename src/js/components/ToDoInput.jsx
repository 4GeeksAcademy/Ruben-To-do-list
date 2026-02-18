import PropTypes from "prop-types";

function ToDoInput({inputValue, onChangeFunction, addTaskFunction, }) {

    return (
        
        <div className="w-100 mx-auto d-flex justify-content-center">
            <input className="w-50 mx-1" type="text" placeholder="Añade una tarea" value={inputValue} onChange={onChangeFunction} onKeyDown={(e) => addTaskFunction(e)} />
            <button className="btn btn-success" onClick={(e) => addTaskFunction(e)}>Añadir</button>
        </div>

    )

}

export default ToDoInput;

ToDoInput.propTypes = {
    inputValue: PropTypes.string.isRequired,
    onChangeFunction: PropTypes.func.isRequired,
    addTaskFunction: PropTypes.func.isRequired
};