import PropTypes from 'prop-types'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MovieCreationIcon from '@mui/icons-material/MovieCreation'

//import Box from '@mui/material/Box'
import { useState } from 'react'
import LaunchIcon from '@mui/icons-material/Launch'
import { BotonDescarga } from '../../componentes/BotonDescarga'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import Chip from '@mui/material/Chip'
import { service } from './../../service/Service'
//import {contenido} from '../../dominio/Contenido'
import './ListItemContenido.css'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Input } from '@mui/material'

import ArticleIcon from '@mui/icons-material/Article'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
//import { ExpandCircleDownOutlined } from '@mui/icons-material'

const mapaIconoExtension = {
  PDF: <PictureAsPdfIcon fontSize="large"></PictureAsPdfIcon>,
  DOCX: <ArticleIcon fontSize="large"></ArticleIcon>,
  MP3: <AudiotrackIcon fontSize="large"></AudiotrackIcon>,
  MP4: <MovieCreationIcon fontSize="large"></MovieCreationIcon>,
  WAV: <OndemandVideoIcon fontSize="large"></OndemandVideoIcon>,
}

const ListItemContenido = (props) => {
  const [openEliminar, setOpenEliminar] = useState(false)
  const [openEditar, setOpenEditar] = useState(false)
  const [nuevoTitulo, setNuevoTitulo] = useState(props.contenido.titulo)
  const [openVisualizar, setOpenVisualizar] = useState(false)

  const aceptarEliminar = async () => {
    try {
      await service.eliminarContenido(props.contenido.idContenido)
      props.eliminar(props.contenido.idContenido)
    } catch (e) {
      console.log(e)
    }
    close()
    window.location.reload()
  }

  const aceptarEdicion = async () => {
    try {
      await service.editarContenido(
        props.contenido.idContenido,
        nuevoTitulo,
        props.contenido.extension
      )
      props.editar(props.contenido.idContenido, nuevoTitulo)
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('El titulo del archivo no debe superar los 50 caracteres')
    }
    close()
    window.location.reload()
  }

  const clickOpenEliminar = () => {
    setOpenEliminar(true)
  }

  const close = () => {
    setOpenEliminar(false)
    setOpenEditar(false)
	setOpenVisualizar(false)
  }

  const clickOpenEditar = () => {
    setOpenEditar(true)
  }

  const clickOpenVisualizar = async () => {
    setOpenVisualizar(true)
    const contenidoVisualizado = {
      idUsuario: 1,
      idContenido: props.contenido.idContenido,
      soUsado: 'Windows',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      horaInicio: new Date().toLocaleTimeString("es-ES"),
      horaFin: new Date().toLocaleTimeString("es-ES"),
    }
    //var urlVideo = await service.guardarVisualizacion(contenidoVisualizado)
    props.visualizar(props.contenido.idContenido)
    //console.log(urlVideo.data)
  }
  //preguntar
  const cambiarTitulo = (event) => {
    setNuevoTitulo(event.target.value)
  }

  function mapearIconoSegunExtension(contenido) {
    return mapaIconoExtension[contenido.extension.toUpperCase()]
  }



  return (
    <Grid item xs={3}>
      <Card className={'glass-background-item'}>
        <CardContent
          sx={{
            background:
              'radial-gradient(100% 2294.72% at 0% 0%, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.24) 99.48%)',
          }}
        >
          <Grid container sx={{ justifyContent: 'space-around' }}>
            <Grid item xs={8}>
              <Chip
                sx={{
                  color: '#000000',
                  fontWeight: '700',
                  background:
                    'radial-gradient(100% 1118.07% at 0% 0%, rgba(12, 111, 246, 0.6) 0%, rgba(0, 235, 247, 0.6) 100%)',
                }}
                label={props.contenido.fechaPublicacion}
              ></Chip>
            </Grid>
            <Grid item xs={2}>
              {props.contenido.extension.toLowerCase() === 'mp4' ? 
                <Button size="small" onClick={clickOpenVisualizar}>
                  <LaunchIcon />
                </Button>
               : 
               <BotonDescarga contenido={props.contenido}/>
			}

              <Dialog open={openVisualizar}>
                <DialogContent><video controls controlsList="nodownload" width='100%' height='auto' src={`http://localhost:9000/reproduccion/${props.contenido.idContenido}`}></video></DialogContent>
                <DialogActions>
                  <Button onClick={close}>Cerrar</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Typography variant="h5" component="div" sx={{wordWrap: 'break-word'}}>
            {props.contenido.titulo}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item xs={4}>
              <Button variant="text" sx={{ color: '#0C6FF6' }}>
                {mapearIconoSegunExtension(props.contenido)}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button size="small" onClick={clickOpenEliminar}>
                <DeleteForeverOutlinedIcon fontSize="large"></DeleteForeverOutlinedIcon>
              </Button>
              <Dialog open={openEliminar}>
                <DialogTitle id="alert-dialog-title">{'Eliminar'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ¿Esta seguro que desea eliminar?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={close}>No</Button>
                  <Button onClick={aceptarEliminar} autoFocus>
                    Si
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item xs={4}>
              <Button size="small" onClick={clickOpenEditar}>
                <ModeOutlinedIcon fontSize="large"></ModeOutlinedIcon>
              </Button>
              <Dialog open={openEditar}>
                <DialogTitle id="alert-dialog-title">{'Editar'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Nombre
                  </DialogContentText>
                  <Input
                    value={nuevoTitulo}
                    onChange={
                      cambiarTitulo
                    }
                  ></Input>
                </DialogContent>
                <DialogActions>
                  <Button onClick={close}>Cancelar</Button>
                  <Button onClick={aceptarEdicion} autoFocus>
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>

    // <ListItem
    // sx={{width: '90%', display: 'flex', justifyContent: 'space-between'}}
    // className='glass-background-item'
    // >
    //   {icono}
    //   <Typography>{nombreContenido}</Typography>
    //   {botonDeAccionContenido}
    // </ListItem>
  )
}

ListItemContenido.propTypes = {
  icono: PropTypes.object,
  botonDeAccionContenido: PropTypes.object,
  contenido: PropTypes.object,
  editar: PropTypes.func,
  eliminar: PropTypes.func,
  IconoDeAccion: PropTypes.func,
  visualizar: PropTypes.func,
}

export default ListItemContenido
