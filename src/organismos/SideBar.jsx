import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import AssessmentIcon from '@mui/icons-material/Assessment'
import { useNavigate } from 'react-router-dom'

const estilosFondo = {
    height: '100%', width: 'auto',
    background: 'radial-gradient(100% 100% at 0% 0%, #0C6FF6 0%, rgba(0, 235, 247, 0.7) 100%)'
}

function SideBar({ cerrarModal }) {
    const navigate = useNavigate()

    const opciones = [{ titulo: 'Inicio', ruta: '/' }, { titulo: 'Reporte', ruta: '/reporte' }]

    return <Box
        sx={estilosFondo}
        role="presentation"
        onClick={cerrarModal}
        onKeyDown={cerrarModal}
    >
        <List
            sx={estilosFondo}
            disablePadding
        >
            {opciones.map((opcion, index) =>
                <ListItem
                    key={opcion.titulo}
                    divider
                    onClick={() => navigate(opcion.ruta)}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <HomeIcon /> : <AssessmentIcon />}
                        </ListItemIcon>
                        <ListItemText primary={opcion.titulo} />
                    </ListItemButton>
                </ListItem>)
            }
        </List>
    </Box>
}

SideBar.propTypes = {
    cerrarModal: PropTypes.func
}

export default SideBar