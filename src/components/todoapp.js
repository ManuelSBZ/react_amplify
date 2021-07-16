import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import todoService from '../services/todoService'
import { totpQrcode } from '@aws-amplify/ui'
import { useEffect } from 'react'


export const TodoApp = (props) => {
    /*Estado: ContentTsak es utilizado para almacenar en tiempo
       de cambio el valor del input del nombre de la tarea*/
    // fields for adding task
    const [Done, setDone] = useState(false)
    const [DescriptionTask, setDescriptionTask] = useState("")
    const [Responsible, setResponsible] = useState("")
    const [Id, setId] = useState("")
    const [Tasks, setTasks] = useState([])

    const deletetask = async (e) => {
        await todoService.deleteTasks(e.target.id.slice(6))
        setTasks(Tasks.filter((item)=> item.id === e.target.id.slice(6)))

        const response = await todoService.getTasks()
        const result = response.data.Items
        // const listTask = result.map(item => <td>{Id}</td><td>{Responsible}</td><td>{DescriptionTask}</td><td><input type="checkbox" id={"DONE" + Id} value={Task.filter} onChange={} /></td> <td><button id={"DELETE" + Id} className="btn btn-danger rounded-circle" onClick={(e) => deletetask(e)}>X</button></td>)
        setTasks([...result])
        
    }
    const responsibleUpdated = (e) => {
        setResponsible(e.target.value)
    }
    const descriptionTaskUpdated = (e) => {
        setDescriptionTask(e.target.value)
    }
    const doneTaskUpdated = (e) => {
        setDone(e.target.checked ? 1 : 0)
    }
    const tasksUpdated = (e) => {
        setTasks(e.target.value)
    }
    useEffect(async ()=>{
        const response = await todoService.getTasks()
        const result = response.data.Items
        // const listTask = result.map(item => <td>{Id}</td><td>{Responsible}</td><td>{DescriptionTask}</td><td><input type="checkbox" id={"DONE" + Id} value={Task.filter} onChange={} /></td> <td><button id={"DELETE" + Id} className="btn btn-danger rounded-circle" onClick={(e) => deletetask(e)}>X</button></td>)
        setTasks([...result])
    },[])

    /* funcion que elimina el contenido value una vez que se hace
        submit */
    // const Erasevalue = (element) => { document.getElementsByName(element)[0].value="" }

    /* funcion que crea una tarea usando a travez de props un metodo
        definido en app que a su vez hace uso de su estado
        (la tareas esta definidas en estado de app) */

    const CreateTask = async () => {
        // crea tarea
        await todoService.postTasks({description:DescriptionTask,responsible:Responsible, done:Done})
        const response = await todoService.getTasks()
        debugger 
        const result = response.data.Items
        // const listTask = result.map(item => <td>{Id}</td><td>{Responsible}</td><td>{DescriptionTask}</td><td><input type="checkbox" id={"DONE" + Id} value={Task.filter} onChange={} /></td> <td><button id={"DELETE" + Id} className="btn btn-danger rounded-circle" onClick={(e) => deletetask(e)}>X</button></td>)
        // setTasks([...Tasks,result.map( item => <tr key={result.length + 1}>
        //     <td>{item.id}</td><td>{item.responsible}</td><td>{item.description}</td><td><input type="checkbox" id={"DONE" + item.id} value={item.done}  /></td> <td><button id={"DELETE" + item.id} className="btn btn-danger rounded-circle" onClick={(e) => deletetask(e)}>X</button></td>
        // </tr>)])
        setTasks([...result])
        // props.create(ContentTask)
        //setea estado de TaskForm a vacio
        // setContentTask("")
        // borra value de input
        // Erasevalue("input")

    }

    const updateStatus = async (e) =>{
        const id = e.target.id.slice(4)
        const item = Tasks.find((item) => item.id === id)
        const checked = e.target.checked 
        item.done = checked ? 1 : 0
        await todoService.updateTasks(item)
        const response = await todoService.getTasks()
        const result = response.data.Items
        setTasks([...result])
    }

    return (
        <div>
            {/* se seta value a ContentTask para que se borre cuando
                se haga submit */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <input type="text"
                            placeholder="Responsible"
                            value={Responsible}
                            onChange={responsibleUpdated}
                            className="form-control my-4"
                        /* onChange se pasa un callback
                            que actualiza el estado 
                            contentTask continuamente */
                        />
                    </div>
                    <div className="col">
                        <input type="text"
                            value={DescriptionTask}
                            placeholder="Description"
                            className="form-control my-4"
                            /* onChange se pasa un callback
                                que actualiza el estado 
                                contentTask continuamente */
                            onChange={descriptionTaskUpdated} />
                    </div>
                    <div className="col">
                        <input type="checkbox"
                            value={Done}
                            placeholder="Done"
                            className="form-control my-4"
                            /* onChange se pasa un callback
                                que actualiza el estado 
                                contentTask continuamente */
                            onChange={doneTaskUpdated} />
                    </div>
                    <button className="my-1  btn btn-primary"
                        onClick={CreateTask}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>

                                <tr>
                                    <th>Id</th>

                                    <th>Responsible</th>

                                    <th>Description</th>

                                    <th>Done</th>

                                    <th>delete</th>

                                </tr>

                            </thead>
                            <tbody>
                                {Tasks.map( item => !Boolean(item.done) ? <tr key={item.id}>
         <td>{item.id}</td><td>{item.responsible}</td><td>{item.description}</td><td><input type="checkbox" onChange={updateStatus} id={"DONE" + item.id} /></td> <td><button id={"DELETE" + item.id} className="btn btn-danger rounded-circle" onClick={(e) => deletetask(e)}>X</button></td>
        </tr> : <tr key={item.id}>
            <td>{item.id}</td><td>{item.responsible}</td><td>{item.description}</td><td><input type="checkbox" onChange={updateStatus} id={"DONE" + item.id} checked /></td> <td><button id={"DELETE" + item.id} className="btn btn-danger rounded-circle" onClick={(e) => deletetask(e)}>X</button></td>
        </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
