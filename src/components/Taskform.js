/*componente que representa la entrada del nombre de la tarea
  y por si misma, la terea */
import React, { useState } from 'react'

export const Taskform = (props) => {
    /*Estado: ContentTsak es utilizado para almacenar en tiempo
       de cambio el valor del input del nombre de la tarea*/
    const [ContentTask, setContentTask] = useState("")

    /*funcion que logra el reflejo del input en tiempo real con la
      variable de estado ContentTask */
    const ContentTaskUpdated = (e) => {
        setContentTask(e.target.value)
    } 

    /* funcion que elimina el contenido value una vez que se hace
        submit */
    // const Erasevalue = (element) => { document.getElementsByName(element)[0].value="" }

    /* funcion que crea una tarea usando a travez de props un metodo
        definido en app que a su vez hace uso de su estado
        (la tareas esta definidas en estado de app) */

    const CreateTask = () =>{
        // crea tarea
        props.create(ContentTask)
        //setea estado de TaskForm a vacio
        setContentTask("")
        // borra value de input
        // Erasevalue("input")
        
    }

    return (
        <div>
            {/* se seta value a ContentTask para que se borre cuando
                se haga submit */}
            <input type="text" 
                value={ContentTask} 
                className="form-control my-4" 
                /* onChange se pasa un callback
                    que actualiza el estado 
                    contentTask continuamente */
                onChange={ContentTaskUpdated}/>

            <button className="my-1  btn btn-primary" 
                    onClick={CreateTask}
                                        >Submit</button>
        </div>
    )
}
