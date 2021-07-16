/* Componente que representa una fila de la tabla de las tareas */

import React from 'react'
import PropTypes from 'prop-types'

import 'bootstrap/dist/css/bootstrap.min.css'

export const Taskrow = props => {
    return (
        <tr>
            <td>{props.task.name}</td>
            {/* el atributo checked quema el valor asignado en la casilla True:seleccionado, false:sin seleccionar.*/}
            <td>
            
            {/* aqui se crea la casilla done para dar por completada
             las tareas */}
            <input type="checkbox"  
                checked={props.task.done} 
                onClick={() => props.toggletask(props.task)}
                />
            
            </td>
            <td className="d-flex justify-content-center"><button className="btn btn-danger rounded-circle" onClick={(e) => {props.deletetask(props.task.name)}}>X</button></td>
        </tr>
    )
}
Taskrow.protoTypes={
    task:PropTypes.object.isRequired,
    toggletask:PropTypes.func.isRequired
}

