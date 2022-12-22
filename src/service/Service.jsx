
import axios from "axios"
import Contenido from "../dominio/Contenido"


const contenidoMockeado = [
	{ idContenido: 0, titulo: 'cars', extension: 'PDF', fechaPublicacion: '11/02/22', url: '/contenidos/descarga.jpeg' },
	{ idContenido: 1, titulo: 'Coco', extension: 'DOCX', fechaPublicacion: '11/02/22', url: '/contenidos/ImagenPrueba.txt' },
	{ idContenido: 2, titulo: 'Casablanca', extension: 'MP4', fechaPublicacion: '11/02/22', url: '/contenidos/descarga.jpeg' }
]

const urlApiBackend = "http://localhost:9000"
function urlConsultaBackend(path) {
	return urlApiBackend + path
}

class Service {
	async eliminarContenido(idContenido) {
		console.log("borrado " + idContenido)
		await axios.delete(urlConsultaBackend('/delete/' + idContenido))
	}

	async editarContenido(idContenido, nombre, extension) {
		console.log("editar " + idContenido + nombre)
		return await axios.put(urlConsultaBackend(`/actualizarContenido/${idContenido}`),Contenido.toJson(idContenido,nombre, extension))

	}

	async getData(textoBusqueda, categoria) {
		console.log("texto" + textoBusqueda + "texto categoria: " + categoria)
		let contenidosJson = {}
		if (categoria !== "TODOS") {
			contenidosJson = await axios.get(urlConsultaBackend('/contenidos-por-categoria'), { params: { categoria: categoria } })
		}
		if (textoBusqueda) {
			contenidosJson = await axios.get(urlConsultaBackend('/contenidos-por-titulo'), { params: { titulo: textoBusqueda } })
		}
		if (!textoBusqueda && categoria === "TODOS") {
			contenidosJson = await axios.get(urlConsultaBackend('/getAll'))
		}
		console.log(contenidosJson)
		return contenidosJson.data.map((contenido) => Contenido.fromJson(contenido))
	}

	async buscarCategorias() {
		const categorias = await axios.get(urlConsultaBackend("/categorias"))
		return categorias
	}

	async guardarDescarga(descarga) {
		await axios.post(urlConsultaBackend("/descarga"), descarga)
	}

	async guardarVisualizacion(contenidoVisualizado) {
		var urlVideo = await axios.post(urlConsultaBackend('/reproduccion/' + contenidoVisualizado.idContenido), contenidoVisualizado)
		return urlVideo
	}

	async subirArchivo(nombre, extension, archivo, categorias) {
		const contenidoYArchivoAsociado = new FormData()
		const contenidoAGuardar = { titulo: nombre, extension: extension.toUpperCase(), categorias: categorias }
		const blob = new Blob(
			[JSON.stringify(contenidoAGuardar)]
			, { type: "application/json" })
		contenidoYArchivoAsociado.append("contenidoG", blob) 
		contenidoYArchivoAsociado.append("archivo", archivo)
		
		const opciones = {
			headers: {
				'Content-Type': "multipart/form-data"
			}
		}
		console.log(urlConsultaBackend('/guardar-el-contenido'))
		return await axios({
			method: 'POST',
			url: urlConsultaBackend('/guardar-el-contenido'),
			data: contenidoYArchivoAsociado,
			config: opciones,
		})
	}

	async buscarReporte() {
		return await axios.get(urlConsultaBackend("/reporte-contenidos"))
	}


}


export const service = new Service()
