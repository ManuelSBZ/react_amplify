/* componente para crear la cabezera de la pagina*/
import React from 'react'
import PropTypes from 'prop-types'


export const Taskheader = (props) => {
    return (
        <h4 className="bg-primary text-white text-center p-4">
            User {props.username} Task schedule (
                {/* aqui se refleja la Numero de tareas por completar */}
                    {
                        props.tasks.filter(e => !e.done).length!==0 
                        ? props.tasks.filter((e) => !e.done).length 
                        : "All done"
                    }
                )
        </h4>
    )
}
Taskheader.protoTypes={
    tasks: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}