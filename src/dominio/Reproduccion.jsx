export class Reproduccion {
  constructor() {
    this.idUsuario = 0
    this.idContenido = 0
    this.so_usado=''
    this.fechaInicio=''
    this.fechaFin=''
    this.horaInicio=''
    this.horaFin=''
  }

  static fromJson(reproduccion) {
    return Object.assign(
      new Reproduccion(),
      reproduccion,
      {}
    )
  }

}