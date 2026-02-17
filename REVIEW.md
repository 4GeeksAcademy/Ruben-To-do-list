# 📝 Code Review: Todolist Application Using React - Rubén Alba González

**Fecha:** 17 de Febrero de 2026  
**Proyecto:** Todolist Application Using React  
**Revisor:** Erwin Aguero  
**Estado:** ⚠️ APROBADO CON OBSERVACIONES

---

## 📊 Resumen de Evaluación

| Categoría | Puntuación | Comentario |
|-----------|------------|------------|
| Funcionalidad Básica | 28/30 | ⚠️ Usa `==` y `!=` en lugar de `===` y `!==` |
| Código Limpio | 16/20 | ⚠️ Lógica mixta, nombres en español |
| Estructura | 12/15 | ⚠️ Todo en un solo componente, falta separación |
| Buenas Prácticas React | 11/15 | ⚠️ Sin PropTypes, sin componentes separados |
| HTML/CSS | 9/10 | ✅ Buenos estilos, efectos hover correctos |
| UX/Experiencia | 8/10 | ✅ Buena experiencia, mensaje cuando no hay tareas |
| **TOTAL** | **84/100** | **APROBADO ⚠️** |

---

## 🎉 Aspectos Positivos

### 1. Funcionalidad Completa ✅

El ToDo List funciona correctamente con todas las funcionalidades esperadas:
- ✅ Agregar tareas (Enter o botón)
- ✅ Borrar tareas individuales
- ✅ Validación de campos vacíos
- ✅ Mensaje cuando no hay tareas

### 2. Excelente UX con Estilos CSS ⭐

```css
.btn-danger{
    display: none;
}

li:hover .btn-danger{
    display: inline-block;
}
```

✅ **Excelente:** Botón de borrar aparece solo en hover
✅ **Muy bueno:** Filas alternas con colores diferentes
✅ **Correcto:** Box-shadow en la lista

### 3. Lógica de Agregar Tareas con Enter

```jsx
onKeyDown={(e) => anadirTarea(e)}
```

✅ **Correcto:** Permite agregar con Enter
✅ **Bueno:** También tiene botón "Añadir"

### 4. Uso Correcto de Filter para Borrar

```jsx
const tareasActualizadas = tareas.filter((_, indice) => indice !== index)
```

✅ **Correcto:** Usa `filter` de forma apropiada
✅ **Bueno:** Mantiene inmutabilidad del estado

---

## 🚨 Problemas Críticos (DEBE CORREGIR)

### 1. ❌ Uso de `==` y `!=` en lugar de `===` y `!==`

**Ubicación:** `ToDoList.jsx` línea 14

**Problema:**
```jsx
if (nuevaTarea.trim() == "" || e.key != "Enter" && e.type != "click") {
    return
}
```

❌ Usa `==` y `!=` (comparación no estricta)

**Solución:**
```jsx
if (nuevaTarea.trim() === "" || e.key !== "Enter" && e.type !== "click") {
    return
}
```

**¿Por qué es importante?**
- `==` hace conversión de tipos (puede causar bugs)
- `===` es más seguro y predecible
- Es la práctica estándar en JavaScript moderno

**Impacto:** -2 puntos

---

### 2. ⚠️ Todo en un Solo Componente

**Problema:** Toda la lógica está en `ToDoList.jsx`

**Actual:**
- ToDoList maneja el estado
- ToDoList renderiza el input
- ToDoList renderiza la lista
- ToDoList renderiza cada item

**Solución:** Separar en componentes más pequeños

```jsx
// ToDoList.jsx (Componente principal)
import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

const ToDoList = () => {
    const [tareas, setTareas] = useState([]);

    const agregarTarea = (tarea) => {
        if (tarea.trim() === "") return;
        setTareas([...tareas, tarea]);
    };

    const borrarTarea = (index) => {
        const tareasActualizadas = tareas.filter((_, indice) => indice !== index);
        setTareas(tareasActualizadas);
    };

    return (
        <div className="container mx-auto text-center">
            <h1 className="title">To Do List</h1>
            <TodoInput onAgregarTarea={agregarTarea} />
            <ul className="w-50 mx-auto p-0">
                {tareas.length === 0 ? (
                    <span className="conditionalText fs-2">
                        No hay tareas, añadir tareas
                    </span>
                ) : (
                    tareas.map((task, index) => (
                        <TodoItem
                            key={index}
                            tarea={task}
                            onBorrar={() => borrarTarea(index)}
                        />
                    ))
                )}
            </ul>
        </div>
    );
};

export default ToDoList;
```

```jsx
// TodoInput.jsx (Componente para agregar tareas)
import { useState } from "react";
import PropTypes from "prop-types";

const TodoInput = ({ onAgregarTarea }) => {
    const [nuevaTarea, setNuevaTarea] = useState("");

    const handleAgregar = (e) => {
        if (e.key !== "Enter" && e.type !== "click") {
            return;
        }
        onAgregarTarea(nuevaTarea);
        setNuevaTarea("");
    };

    return (
        <div className="w-100 mx-auto d-flex justify-content-center">
            <input
                className="w-50 mx-1"
                type="text"
                placeholder="Añade una tarea"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                onKeyDown={handleAgregar}
            />
            <button
                className="btn btn-success"
                onClick={handleAgregar}
            >
                Añadir
            </button>
        </div>
    );
};

TodoInput.propTypes = {
    onAgregarTarea: PropTypes.func.isRequired
};

export default TodoInput;
```

```jsx
// TodoItem.jsx (Componente para cada tarea)
import PropTypes from "prop-types";

const TodoItem = ({ tarea, onBorrar }) => {
    return (
        <li className="w-100">
            <span>{tarea}</span>
            <div className="d-flex justify-content-end px-2">
                <button
                    className="btn btn-danger"
                    onClick={onBorrar}
                >
                    Borrar
                </button>
            </div>
        </li>
    );
};

TodoItem.propTypes = {
    tarea: PropTypes.string.isRequired,
    onBorrar: PropTypes.func.isRequired
};

export default TodoItem;
```

**Ventajas:**
- Cada componente tiene una responsabilidad única
- Más fácil de testear
- Más fácil de mantener
- Sigue el principio de Single Responsibility

**Impacto:** -3 puntos

---

## ⚠️ Problemas Importantes (DEBE MEJORAR)

### 3. Falta de PropTypes

**Problema:** No hay validación de tipos en los componentes

**Solución:** Ya mostrada en el punto anterior, agregar PropTypes a todos los componentes que reciban props.

**Impacto:** -2 puntos

---

### 4. Nombres de Variables en Español

**Ubicación:** Todo el código

**Problema:**
```jsx
const [tareas, setTareas] = useState([])
const [nuevaTarea, setNuevaTarea] = useState("")
function cambioInput(e) { ... }
function anadirTarea(e) { ... }
function borrarTarea(index) { ... }
```

**Recomendación:** Usar inglés (estándar en programación)

```jsx
const [tasks, setTasks] = useState([])
const [newTask, setNewTask] = useState("")
function handleInputChange(e) { ... }
function addTask(e) { ... }
function deleteTask(index) { ... }
```

**¿Por qué?**
- Estándar internacional en programación
- Facilita colaboración con otros desarrolladores
- Consistente con librerías (React usa inglés)

**Impacto:** -2 puntos (buenas prácticas)

---

### 5. Lógica Compleja en `anadirTarea`

**Problema:** Condición demasiado compleja en una línea

**Actual:**
```jsx
if (nuevaTarea.trim() == "" || e.key != "Enter" && e.type != "click") {
    return
}
```

**Problema:** Mezcla validación de input con validación de evento

**Solución:** Separar las responsabilidades

```jsx
const handleAddTask = (e) => {
    // Validar que sea el evento correcto
    if (e.key !== "Enter" && e.type !== "click") {
        return;
    }
    
    // Validar que el input no esté vacío
    if (newTask.trim() === "") {
        return;
    }
    
    // Agregar la tarea
    setTasks([...tasks, newTask]);
    setNewTask("");
};
```

**Ventajas:**
- Más legible
- Más fácil de entender
- Más fácil de debuggear

**Impacto:** -2 puntos

---

## 💡 Sugerencias de Mejora (Opcional)

### 6. Agregar ID Único a las Tareas

**Problema:** Usas el índice como key

**Actual:**
```jsx
{tareas.map((task, taskIndex) => (
    <li key={taskIndex}>  // ❌ Índice como key
```

**Sugerencia:** Usar un ID único

```jsx
const [tasks, setTasks] = useState([]);

const addTask = (taskText) => {
    const newTask = {
        id: Date.now(), // O usar uuid
        text: taskText,
        completed: false
    };
    setTasks([...tasks, newTask]);
};

// En el render
{tasks.map((task) => (
    <TodoItem
        key={task.id}  // ✅ ID único como key
        task={task}
        onDelete={() => deleteTask(task.id)}
    />
))}
```

---

### 7. Agregar Funcionalidad de Completar Tareas

**Sugerencia:** Tachar tareas completadas

```jsx
const [tasks, setTasks] = useState([]);

const toggleTask = (id) => {
    setTasks(tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    ));
};

// En TodoItem.jsx
<span
    style={{
        textDecoration: task.completed ? 'line-through' : 'none',
        cursor: 'pointer'
    }}
    onClick={() => onToggle(task.id)}
>
    {task.text}
</span>
```

---

### 8. Contador de Tareas

**Sugerencia:** Mostrar cuántas tareas hay

```jsx
<div className="mt-2 text-muted">
    {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} pendiente{tasks.length !== 1 ? 's' : ''}
</div>
```

---

### 9. Persistencia con localStorage

**Sugerencia:** Guardar tareas en localStorage

```jsx
import { useState, useEffect } from "react";

const ToDoList = () => {
    const [tasks, setTasks] = useState(() => {
        // Cargar del localStorage al iniciar
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    // Guardar en localStorage cuando cambien las tareas
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(tasks));
    }, [tasks]);

    // ... resto del código
};
```

---

### 10. Mejorar Mensaje de Lista Vacía

**Actual:**
```jsx
<span className="conditionalText fs-2">No hay tareas, añadir tareas</span>
```

**Sugerencia:**
```jsx
<div className="text-center py-5">
    <p className="conditionalText fs-2">📝 No hay tareas</p>
    <p className="text-muted">¡Agrega tu primera tarea arriba!</p>
</div>
```

---

## 📚 Conceptos Demostrados

Has demostrado comprensión de:

1. ✅ **useState** - Manejo de estado (tareas y nuevaTarea)
2. ✅ **Eventos** - onChange, onKeyDown, onClick
3. ✅ **Renderizado condicional** - Mostrar mensaje cuando no hay tareas
4. ✅ **Listas y Keys** - map para renderizar tareas
5. ✅ **Manipulación de arrays** - filter para borrar, spread para agregar
6. ✅ **Validación** - trim() para evitar tareas vacías
7. ✅ **CSS** - Estilos personalizados, hover effects

---

## 🎯 Comparación con Requisitos del Proyecto

| Requisito | Estado | Nota |
|-----------|--------|------|
| Agregar tareas | ✅ | Funciona con Enter y botón |
| Borrar tareas | ✅ | Botón individual por tarea |
| Validar input vacío | ✅ | trim() implementado |
| Lista responsive | ✅ | Bootstrap classes |
| Estilos personalizados | ✅ | Hover effects, colores |
| Mensaje lista vacía | ✅ | Implementado |
| Usar useState | ✅ | Correcto |
| Componentes separados | ❌ | Todo en un componente |
| PropTypes | ❌ | No implementado |
| Buenas prácticas | ⚠️ | Usa `==` en lugar de `===` |

---

## 🎓 Conclusión

**Puntuación Final: 84/100 - APROBADO ⚠️**

### Aspectos Fuertes:
- ✅ Funcionalidad completa y correcta
- ✅ Excelente UX con hover effects
- ✅ Validación de inputs
- ✅ Código compila sin errores

### Áreas a Mejorar:
1. **Crítico:** Usar `===` y `!==` en lugar de `==` y `!=`
2. **Importante:** Separar en componentes más pequeños
3. **Importante:** Implementar PropTypes
4. **Recomendado:** Usar nombres en inglés
5. **Opcional:** Agregar más funcionalidades (completar, persistencia, contador)

### Para la Próxima Entrega:
- Refactorizar en componentes TodoInput, TodoItem
- Agregar PropTypes a todos los componentes
- Usar comparación estricta (===, !==)
- Considerar usar inglés para nombres de variables

**El proyecto está aprobado** pero hay espacio significativo para mejorar la estructura y seguir mejores prácticas de React.

**¡Buen trabajo en general!** 👍

---

Co-Authored-By: Warp <agent@warp.dev>
