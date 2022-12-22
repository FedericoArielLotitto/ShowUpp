import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'

import { useEffect, useState } from 'react'
import { service } from '../../service/Service'

function TablaContenidos() {
    const [registrosReporte, setRegistrosReporte] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
          const registrosReporte = await service.buscarReporte()
          setRegistrosReporte(registrosReporte.data)
        }
        try {
          fetchData()
        } catch (error) {
          console.log(error)
        }
      }, [])
    return <Container sx={{paddingTop: '2%'}}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Extension</TableCell>
                        <TableCell align="right">Cantidad de visualizaciones</TableCell>
                        <TableCell align="right">Cantidad de descargas</TableCell>
                        <TableCell align="right">Categorias</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {registrosReporte.map((contenido, index) =>
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {contenido.tipo}
                            </TableCell>
                            <TableCell>{contenido.extension}</TableCell>
                            <TableCell align="right">{contenido.cantidadVisualizaciones}</TableCell>
                            <TableCell align="right">{contenido.cantidadDescargas}</TableCell>
                            <TableCell align="right">{contenido.categorias}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}

export default TablaContenidos