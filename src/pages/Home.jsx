import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import ListItemContenido from '../atomos/ListItemContenido/ListItemContenido'
import ScrollBarCategoria from '../moleculas/ScrollBarCategoria/ScrollBarCategoria'
import Button from '@mui/material/Button'
import ModalSubirArchivo from '../componentes/ModalSubirArchivo'
import { useState } from 'react'


export default function Home(props) {
  const [openNuevoArchivo, setOpenNuevoArchivo] = useState(false)

  const close = () => {
    setOpenNuevoArchivo(false)
  }

  const clickNuevoArchivo = () => {
    setOpenNuevoArchivo(true)
  }

  return (
    <>
      <ScrollBarCategoria
        categoriaActiva={props.categoriaActiva}
        setCategoriaActiva={props.setCategoriaActiva}
      />
      <Container sx={{ paddingTop: '2%' }}>
        <Button
          sx={{ float: 'right' }}
          variant="contained"
          onClick={clickNuevoArchivo}
        >
          Nuevo archivo
        </Button>
        {/*No borren esta condicion poruqe sino falla todo XD!*/}
        {openNuevoArchivo && <ModalSubirArchivo close={close} openNuevoArchivo={openNuevoArchivo} />}
        <Grid container spacing={2}>
          {props.contenidos.map((contenido, index) => 
            <ListItemContenido
              key={index}
              botonDeAccionContenido={
                <ArrowCircleDownRoundedIcon fontSize="large" />
              }
              contenido={contenido}
              editar={props.editar}
              eliminar={props.eliminar}
              visualizar={props.visualizar}
            ></ListItemContenido>
          )}
        </Grid>
      </Container>
    </>
  )
}

Home.propTypes = {
  contenidos: PropTypes.array,
  editar: PropTypes.func,
  eliminar: PropTypes.func,
  categoriaActiva: PropTypes.string,
  setCategoriaActiva: PropTypes.func,
  visualizar: PropTypes.func,
}
