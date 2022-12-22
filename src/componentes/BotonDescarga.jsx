import Link from '@mui/material/Link'
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { service } from '../service/Service'

export const BotonDescarga = (props) => {

  const estaLogueado = true

  async function guardarDescarga() {
    const descarga = { 
      velocidadTransferencia: (Math.random() * 7.8).toFixed(2),
      idContenido: props.contenido.idContenido
    }
    console.log(descarga)
    await service.guardarDescarga(descarga)

  }

  return (
    <Link sx={{ pointerEvents: estaLogueado ? 'auto' : 'none' }}
      href={`http://localhost:9000/descargar/${props.contenido.idContenido}`}
      download
    >
      <Button size="small" onClick={guardarDescarga} disabled={!estaLogueado}>
        <DownloadForOfflineRoundedIcon sx={{ color: estaLogueado ? '#0C6FF6' : 'grey' }} />
      </Button>
    </Link>
  )
}

BotonDescarga.propTypes = {
  contenido: PropTypes.object,
}
