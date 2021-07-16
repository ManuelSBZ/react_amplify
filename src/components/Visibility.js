import React from 'react'
import PropTypes from 'prop-types'

/* componente tipo check para controlar la vizualizacion de las tareas completadas */
export const Visibility = (props) => {
    return (
        <div /*className="form-check"*/>
            <input type="checkbox" 
                /*className="form-check-input"*/ 
                // estado (booleano)de la casilla es independiente del estado 
                // del showdone => checked de app , es por eso que se enlaza para que no haya discrepancia
                checked={props.checked} 
                onChange={props.showtaskdone}
                // onChange={(e)=>{ props.showtaskdone(e.target.checked) }}
                />
        <label htmlFor="">{props.label}</label>
        </div>
    )
}

Visibility.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    showtaskdone: PropTypes.func.isRequired
}



