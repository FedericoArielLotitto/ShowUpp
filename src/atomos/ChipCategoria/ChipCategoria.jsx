//import { useState } from 'react'
import PropTypes from 'prop-types'

import Chip from '@mui/material/Chip'
import './ChipCategoria.css'


function ChipDescarga({texto,estaClickeado,index,setCategoriaActiva}) {

    return <Chip
        sx={{margin: '1% 2% 1% 2%'}}
        label={texto}
        className={estaClickeado ? 'glass-background-esta-clickeado' : 'glass-background'}
        onClick={() => setCategoriaActiva(texto)}
    />
}


ChipDescarga.propTypes = {
    texto: PropTypes.string,
    estaClickeado: PropTypes.bool,
    index: PropTypes.number,
    setCategoriaActiva: PropTypes.func,
}

export default ChipDescarga