import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha, createTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import SideBar from '../organismos/SideBar'
import { useState } from 'react'

const theme = createTheme({
	palette: {
		primary: {
			main: '#42C2FF',
		},
		secondary: {
			main: '#85F4FF',
		},
		icono: {
			main: '#0C6FF6',
		},
		tertiary: {
			main: '#B8FFF9',
		},
	},
})

export default function Header(props) {
	
	const [estaDesplegado, setEstaDesplegado] = useState(false)

	const SearchIconWrapper = styled('div')(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}))

	const searchStyle = {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
		visibility: `${ocultarBarraDeBusquedaParaPaginaReporte()}`
	}

	const textFieldStyle = {
		'& .MuiInputBase-input': {
			paddingLeft: `calc(1em + ${theme.spacing(4)})`
		},
		'& .MuiInputBase-root': {
			borderRadius: theme.shape.borderRadius,
		}
	}

	function ocultarBarraDeBusquedaParaPaginaReporte() {
		return window.location.pathname === '/reporte' ? 'hidden' : 'visible'
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				sx={{ display: 'flex', alignItems: 'space-around' }}
				position="static"
				theme={theme}
				color="primary"
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						onClick={() => setEstaDesplegado(true)}
						sx={{ mr: 2 }}
					>
						<MenuIcon theme={theme} color="icono" />
					</IconButton>
					<Drawer
						anchor={'left'}
						open={estaDesplegado}
						onClose={() => setEstaDesplegado(false)}
					>
						<SideBar cerrarModal={() => setEstaDesplegado(false)}></SideBar>
					</Drawer>

					<Box sx={searchStyle} >
						<SearchIconWrapper>
							<SearchIcon theme={theme} color="icono" />
						</SearchIconWrapper>
						<TextField
							sx={textFieldStyle}
							value={props.textoBusqueda}
							placeholder='Buscar...'
							onChange={(event) => props.setTextoBusqueda(event.target.value)}
						/>
					</Box>
					<IconButton color="inherit" sx={{ marginLeft: "auto" }}>
						<Avatar src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWEhgSFRYYGBgYGBoYGBoYGBgYHBgZGBocGRgaGhgcIS4lHB4rHxgZJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQrISs0MTQxNDQ0NDQ0NDY0NDQ9MTQxMTQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0P//AABEIAO0A1QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xAA+EAABAgMDBwoFBAEEAwAAAAABAAIDBBEFEiEGMTJBUXGBBxMiUmFykaGxwRSCkuHwQmKi0bIVI0PxJcLi/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAIBBAMFBv/EACURAQEAAgICAgICAwEAAAAAAAABAhEDIQQxEmEiUUJxMkHBBf/aAAwDAQACEQMRAD8A65LQGXG9FuiNQ2J3mG9Vv0hJLaDO630TyBr4dvVb9IR8O3qt+kJ1CBrmGdVvgEGAzqt8AnUIGvh2dVv0hBgM6rfAJ1CBr4dvVb9IR8O3qt+kJ1CBr4dvVb9IRzDOq3wCdQga5hvVb9IR8O3qt+kJ1CBr4dvVb9IR8Ozqt+kJwoQN/Dt6rfpCOZZ1W+ATqEDXMM6rfAI+Hb1W/SE6hA18O3qt+kI5hvVb9ITqEDXMM6rfAIMBpztb4BOJUDXMN6rfpCOYb1W/SE6hBV2jCZ0ei3XqHYhe7UGjx9kKWbiZA0G90eidTUvoN7o9E6qaEISFAqRCVAIQvJICBUqYE0zNfbXvD+08CgVIlSIFQhIUCoSIQKhIlQCRKkQKhCEAhIgIFQkSoK21Do8fZC82v+nDbr3IWM1FhBHRbuHova8QtFu4ei9rWlQhCBEJU3FeGtLiaBoJJ2ACpQYnlAy5bItEJl10d4qL2LYbcwe4DFxJzN10JzDHjdo29OzJvPMR4PXJu8GCjRwXiPOunZ6LNPqQ57nNB1NzMHBoaFagq5NRnus28TAxMNv0j2Kfk8pZuA6sONFhdjXuu/Q7o+SvCqeeiBzs2HqtkbZpu8m+V+ICGTrA9ubnYQuvb2uhnB3Cm4rrdl2pBmIbY0F7Xsdmc0+RGcHsK+WIkuM46J7P6Vhk1lJMSEbnIJwJF+Ga3Ije0ajsIxHrOWLNvqVKs/kplVAn4XOQXdIAX4ZIvsJ2jWNjhgVoFLSUQlXh7wBUmgGcnADeUHpC51lRyrysuTDgAzEQYVaaQwe1/wCr5Qd65vafKraUUm5EZBbqENja07z6lbofRqF8tHLe0ia/GRq9+g8Army+U6fhkB0YvGx7WuHGoDvApofRqFzfJjlQgxi1kwGwiTQRGmsOuoPrjDr21G0hdGWBUJUIBCEiCFaI0ePskRaI0ePshSmpcDQb3R6JxNwNFu4eicVKCEJECrPZdzRh2ZNvBoeYe0HYXi4PNy0CyPKpX/RpqnVh+HOsr5IOC2E8NGJAw14YkhXTCsgY111NhPgrCUtNo7FdumSdr2ZfRpVK91Sn32qxwumnmozZqGDUkFMclZC4FDnWADcVaOmJd2d5ZuaD7qqn3MzMdeFc9CEt2l5krQiQIjY0F7ob25nNND9wdhwXRLK5ZZpjbsaDDjU/UCYTjvoC0ncAuXOTkNjjWgJ20BPosHX43LY4ikOSF45r0Wo8AzHxWHyly3nZ3oRYl1h/4odWs+bGrvmJWagRrjw7PdObhRWEhLl994aK40aNQGeg4+STRVe6HQ4ryWpyOekV4JWUiTJTj4Zq3NrBzH+lqJeIyIwOoCDqIBptBWQAwVzk/G6Toeoi8N4wPt4LYvSVMWUzSh9B+qmiewjYV1DkdyodGhPkYhN+AAYd7PzdbpZ23XUA7HAalz8nFSsgYxhW7Cpmih7Xbnw3H/NgK3KdIfQqEiFDSoQhBBtE6PH2QktI6OO32SKdpqXA0W7h6J1NQNBvdHonVSghCEAszyiwb9lTbdkFzvoo/wD9VplEtOUEWBEgnNEhvYdz2lvug+T3Q2uNduPkvJgDaU5zbm9Fwo5jixw2OaaEJSqvZDPMdqbMLtT5K8oWmuZ7U5c1al6Tb30RjyyHeeGtzk0H5+ZlqpOK2GwMbx2knO4rP2dRtXHOcB2DWVOL9a5ubK26ZTNvQBeERo0sHd7UeI9FWQojhQtJFDhQ5lbzAvsI8N4xH52qpgHOF6cV3jqkLEJJqc+tNFSqBIWDYF66aaDj5KTZcYMitJNBiCTsIPvReAwbF6DRsTSlrMW0xtboLj4DxKm5ATDolryr3UrzoGAwADH4eqzl0VzDwWz5KZW/a0A6mNiRDwYWDzeFt9JfQ4QhKoaEIQgr7T/Tx9kJLUGjiNfshSnpMl9BvdHonU1L6De6PROqlBCEIBCEIPnnlPsIytoOiXaQZomI1wzNf+sbw43tz+xY2Iwtz5tRGYr6fyjsGDOwHS8dtWnFpGDmOGZ7TTAip7CCQagrhGU2Q81IxLjHtjMIvNpQGladJjsxw1EpcpJ3WMmV4vJ6MyI3Sg3flcPdRS5xNAKdgFPut+UCPiL3KSrnnAYayrCQsVzzV3gPdaaVsV1AaADYBReHJzSdRuldK2aA2pxUgyzaZq46loINkmgqE6bMpqC48srbtOmOmZE0qzwWdmGlrs1NfHWugTkkWVw8lmrUk7w/dq7V78PJZdVqnY+oXtRMWmhwI1KQx4K7ZR7BXsLxVKCtbt6K6ryHWfWLMzJGDGMgtPa433+jFyhzqC94L6R5OrEMpZ0KG4UiOrFiDWHvxunta2635VlvQ1SEIUgQhCCttT9OI1+yF7tKnRr2+yRTtm0uBoN7o9E6moGg3uj0TqpoQhCAQhCBCuUZXTpfHe6uAN1u5uA9zxXU456LqbD6LmszZpJNRXYuHzLvWLK53MyT4jiKUHqrCzcm8RVv9/ZbiWsltcwrq4fdW0OUYyh1/mdc15LJqEUNm5N4ZgBtp+VV7LWHgRSg1EqS+1oTWAGgocBUDP2r1CyhZqbXdU+gXnMsrbteVx+Mk9oUSxyDgMBr7FEjWe6ubZX81q5fbjNbXDHYf6UV1qNOYjcSFUlTKo5mz65/+1nLSsYUwW+5xjj0tesYpm0rIBZfY69QVptWzLKG44nbFlHPTEZjt7CqJ0JzTSmZddtSyw5tdRz7zmWNtKyCDgKEZj/a7OLyOm5Y3G6rK3iM/ngUoeSQBr1DEnsC1dlsBNxwBI1OAK6nybysIGJRjA4BhBDW1Aq6tDTcvWeTLlMde0bZXk15PYr4rJycYWQ2EOhQnijnuGLXOacWtBxocSQNWfttEqF77UEIQgEiVCCrtcHo0/d7ITto16PH2QptZtLg6I3D0Tial9BvdHonVTQhCEAhCEDcUVaRtBHkspMyrgejQtzgHAg1wFVrlQ2xIvFYkLHW5uuu1v8AS5+fjuUln+mWKl0B5reIFNgqvBYwaRLt59goD55+Iqdm7sUKJMHauLLj77IvBNsbosYPkB8yvRtp4zO8h7LM84TrSCIU+PXTdNH/AK08nSr4JuJPh4o4A8AqIP1r256uY/TNLVjIZOtvaw0p8pqCvbmRWCrHiINgN14+U4O4FU4iFe4c3RRqbNJJmGPF2lHVxBFCDuVfO2cCMQrAxGvxdnGvMRxSOLm4O6TdR1jeFMx16bcrfbIx7LuuvDV5rX8n8S7NFua+xwG8EO9io8SVa/pNNVaZKSJE01/VDydxF33C9cP8p/addugIQhfSURKhCAQhIgg2iNHj7IRaLtHDb7IU1NlS4Wi3cPROJqBoN7o9E6qUEIQgEhSpECpEqEFValiw4wqRdd1m5+PW4rm8+65EcyocGuIqMxoaV7F0615rm4D3jOG0b3jg3zIXK5nEkFfM83mnHlJJ3fY8iJVOMKrw4tPknmP1jMpw5PlNxsqdeCCmg5I9y6Jl017cvF5NPi6k26MvPKwS2RCp8tNUz5lTwoxOYVUyyYPPxmwQ4NLq4uBpgCaeRWTXU/aelo1jXGoNDrpgtPkzJ3b0Tsug7dZp2YBEjkuxlC97nkatFvgMT4q/YwAUAoBmAXVhxau6yQ4hIhdDSoSBKgEiVCCBaI0ePshLaDtHj7IU1N2lQNBvdHonE3B0W7h6JxUoIQhAJEIQCKpUiDLZaTVGMhjWS48MG+ZPgsO5lfzWtBlRNB0y8amUYN4F53mSsxMTjWxAw6zQeGb1X53ysryc9+v+JrzHZVRxVuB8VLdnK8uhXhT0VcFsu4SvMOJgiJFTT4ZaaFNOBOC+hMppYfFCaDnOTgg0xOdLnXNyW2/SLT8tELK0GJTkpHMOM2KM7XBw7bprRRIkcMaCdZFO0/gUllCA7WvD5ZTWmSdu0QnhzQ4ZiARuIqE4qTJKa5yUhnW0Fh+Q0HlRXa+9hd4yrCVCFQRKkSoBCEIINojRw2+yRLaP6ePshTUpMvoN7o9E6m4Oi3cPROKlBCEIBCEIEXl5oKnUvSqcpprm5SK7WW3Rvf0fdTldY2jnExNhxfEOcue4/MS73WVlWujzRcCbsFhiu2UvNhgdmMQHgrK1Jm7DJrSqsMibP/8AHTk24YxHshsP7Yb2k+Ln0+VfJ4uPfyzv6pCPZU02n7J6BDOde4EMlx8uCtpWTrivDh9JtVkSXvAk4at6iGWpjn7Fpo0pq81STWBou+SabO0B8EuzJsQbrSTnV1Z0G801Ue1IVGEjgvDP0m3vTPWlJuiw3XSaw2PjYCtRCaXuHEApLImg9l3PgtLkY1rptjXCodDiNI2gtNR4VWLl4JlpmJLOOMN7mY5yGkhp4ih4pjh8uGZfdXZ06tyczVWxoWxzXj5hdP8AgPFbZcryEmrk8GHNEY9nEdMf4EcV1MLv8a744yPSEIXQ0IQhAIQhBXWp+nj7IXq0f08fZCm1m0uBoN7o9E4moGg3uj0TqpoQhCAQkQgFjuUOZpChwxnc8u4MFPVw8FsVzPlCm6zNzUxjRxdVx8qLw57rC/bL6c9t+YqLtd66lEkfhrFhQKUcRDLh+9zxEf518FzGy5UzNoQIGp8Rt8fsb03/AMGuXXcvYn+3Ch9aIXU7GNPu4Lms+PBlfpeM7jLyUMk02nyzrSSUKgx/NhVJINq6v4di0VDdBAz0r4L5/DOnlndVHnlk599H7ytXaDqZ9yzU5Dq7ELvmtGCwsoVYaBR7aYbh7QVOslnQrTf6pm3G9A7Pz3oubP0z+aqyQiXZ6Adrnj6mPA9lXcqMhzVpCMBRsZjX/OzoO8gw8V7s2PcmILzhdiwyd18VrwqtRyxSF6ThzAGMGIAe5E6J/mIa6PF/Lis+3tf9MbZE6GRIUUHQexx3Agu8qhd0BXzrZkaraU++pd2ybm+dk4MStSWNB7zei7zBXR419xE96WyEIXU0IQkQKhCEEG0adHj7JEWiNHj7JFNqbpMgaDe6PROJqBoN7o9E6qUEIQgEIQg8rjeVcYujRH6nPdQ9gN0eQC63aMxzcF8TqMc76QSuJZTx7kNkPObgLjtNMdy4/Ku9RNvciy5IJG/ORpgjCEy4O9EPqGsd9S1OXEa9MQ2dVl49l93/AMJOR+RuWeYpFDGiOf8AK3oN/wASeKr7aiiJOxnZ6ODBuYA0jxvLz8v8eGY/vT0w9pdkswveA7Kf3VaiEzo5t3sqOyoIDccNZ9/Uq9gxQR0dS4+DHbx5PaptEgVJ1eyoI4BoVobTgteC07iqSNADABqC7NdNwWVks6G8+2Cg2ziC2urN201dmPknJObDCGH9WAOxebZhml4CuvdgVz5zUJ/mxLwekdY9cD+bl1u1JYTlnPYP+aBVuvpOaHMPB1DwXKojA1zvL84ldOyDmr8iwa4ZdDPyno/xLV7eFe7j9PbKdOGWLExzePmu1cnUesq6Gc7HmndeA8eZcuS21JCBaczAzC+5ze6/ptpwdTgt/wAmc3/uOYTpwWuA7YTyw+T2+C98J8eTTy326ShCF1qCEIQCEIQQp+vRp2+yEloDR4+yFNqbEqBoN7o9E4m4Gg3uj0TipQQhCAQhCCgyxjXZVzRniOYwcXAu/iHLiGWE0XRHkagABuXZcsXA80w5gXxD8rbo/wAyuPSsr8TaUvBzh8dpPcYb7/4tcuPOzLm1+kfydwsOWErIQmOwEGA29vayrz41XP7KhlwMRxq5zy9/ec4uI3YrcZbTN2Te0Z4hbDHzGrv4hyy1nwaMAOtcv/oZ/lMJ/b3wmpavZOHXDsI8l7n78KH0MSXY7lIs4aqas/qpM2+l0XagnHsWcGM05cu6qZl5DAdZGPgqWPHY9xh1xzkbFo5loNcO1UE3Lsa50SmNF2daemAlGguAdqKlWyygvUw/K1VNZs+XuddbokDetJNMvQiNx3Fc/JjNMy6u2FmWdKoWp5MpmhjwK5i2I3jVj/8AFnis/Oww1525k7knMc1aMOpwiB0M/MKt/k1g4rw8bL48ke/vFD5XJTm7RgzAzRIYB70N1D/F7fBOZDTdybg44X3Qz3YrCW/zaFf8s0jfkoccZ4UUV7sQFh/lcWHsWPdpEGdghxR2mE9pPlVfQ5b8cpk8cvcd+QvDCCKjMcV7XUoIQhAIQhBAtI6PH2Qi0v08fZCmpqVA0G90eicVdBnugOjqGvs3JTaP7duv7JK3awQoLZ/9u3X9l4Fp/t8/st2bWKFXNtKv6fP7L06fwrd8/smzbKZYThbEiuwo2E1grqc4lxO/EBY7kuledtR0WmECC47nxCGt/jfVtlbNkw4rqDpRCDrwbgBXgE7yQMDGTD6Vc+MGk5qBjKgeLyuDg/Llyt+2TVtW+XkxeiwJcfue7sr0QfJ3ivEGDiBsb4alHtN5fPxHnVRoGwAbd9TxVlINxxxXFz7z8i/qPW2zDSxliRDwz0T0KKHNpXEYJIA1JRLhpJGtdfHi59VAjP6RHYqqZ1gq5mBhXZVVMXGpXRZV4q6AwMOGFTVX0tFDmYYqhnGUY6h1JqwZotBBx156bV5ZTrdbnOiW1BAde4qiny5jmRG6TC1w7zTeb5hae15gFlbuNNu0blm5l1YZw2eS4eSWZyxWGXWnS8qZcTVlxg3HnIBfD7XBoiM/k0LjuTEVpayorW8w7nig8yupZE2oXSUJhbWl5la/pDjQUpsw4LlMpAEGLFhtxayM4NGaghxCG+QC+jy/lhKjJ3LJiYL5OC52lca13eZ0T5tVsshklPXYDm3agRYlMaUBN6mbaSrs2r+zXTS+y6OO7xlrZdxaIVaLT/b/AC+yG2pU6P8AL7K+jcWSFXOtOmF3z+yc+P8A2+f2To2WfOjx9kKHNT9adHbr+yFNsZX/2Q==" />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

Header.propTypes = {
	setContenidos: PropTypes.func,
	textoBusqueda: PropTypes.string,
	setTextoBusqueda: PropTypes.func,
}

