/* componente que abstrae la realizacion de las tablas
    esta tiene como props listItems => array[jsxcomponent...] , theadrows => array[str...], tableclass*/
import React from 'react'
import PropTypes from 'prop-types'


export const Table = (props) => {
    /* funcion que retorna titulos de campos[theadrows()]*/
    const theadrows = () => {
        return props.theadrows.map(head => <th key={head}>{head}</th>)
        }

    /* funcion  que retorna serie de registros de tablas en elementos
        rows, esta se apoya del retorno de una funcion definida en
        app*/
    const tbodyrows= () => {
        return props.listItems
        }
    
    /*se retorna la estructura de la tabla, con cierto grado 
      de versatilidad*/
    return (
        <table className={props.tableclass}  >
    
            <thead>
                <tr>
                    {theadrows()}
                </tr>
            </thead>
    
            <tbody>
                {tbodyrows()}
            </tbody>
        </table>
        )
}
/*validadores de tipos de las props */
Table.protoTypes={
    listItems:PropTypes.func.isRequired,
    theadrows:PropTypes.array.isRequired,
    tableclass:PropTypes.string
    
}