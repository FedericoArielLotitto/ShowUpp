import ChipCategoria from "../../atomos/ChipCategoria/ChipCategoria"
import './ScrollBarCategoria.css'
import { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { service } from './../../service/Service'
import PropTypes from 'prop-types'

function ScrollBarCategoria(props) {
    const [categorias, setCategorias] = useState([])
    useEffect(() => {
		const fetchData = async () => {
			const categoriasBackend = await service.buscarCategorias()
			setCategorias(categoriasBackend.data)
		}
		try {
			fetchData()
		} catch (error) {
			console.log(error)
		}
	}, [])

    return <Box sx={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%' }}>
        {[{nombre: "TODOS"}, ...categorias].map((categoria, index) =>
            <ChipCategoria
                key={index}
                texto={categoria.nombre}
                index={index}
                setCategoriaActiva={props.setCategoriaActiva}
                estaClickeado={props.categoriaActiva === categoria.nombre}
                 />
        )}
    </Box>
}

ScrollBarCategoria.propTypes = {
	setCategoriaActiva: PropTypes.func,
    categoriaActiva: PropTypes.string,
}

export default ScrollBarCategoria
