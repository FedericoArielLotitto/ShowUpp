import { useState } from 'react'
import PropTypes from 'prop-types'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

function CheckboxCategoria({ categoria, setCategoriasAGuardar }) {
    const [estaChecado, setEstaChecado] = useState(false)

    function handleChange() {
        if(!estaChecado) {
            setCategoriasAGuardar(actuales => [...actuales, categoria])
            setEstaChecado(!estaChecado)
        } else {
            setCategoriasAGuardar(actuales => actuales.filter(a => a.id !== categoria.id))
            setEstaChecado(!estaChecado)
        }
    }

    return <FormControlLabel key={categoria.id}
        control={
            <Checkbox checked={estaChecado} onChange={handleChange} name={categoria.nombre} />
        }
        label={categoria.nombre}
    />
}

CheckboxCategoria.propTypes = {
    categoria: PropTypes.object,
    setCategoriasAGuardar: PropTypes.func,
    categoriasAGuardar: PropTypes.array
}

export default CheckboxCategoria