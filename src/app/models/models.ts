export interface alumno {
    _id: any
    email: String,
    nombre: String,
    apellido: String,
    edad: Number,
    pais: String,
    sexo: String,
    clave: String
}



export interface Curso {
    _id: String,
    profesor: String,
    nombre: String,
    inicia: Date,
    finaliza: Date,
    estudiantes: alumno[],
    imagen: String,
    inscripcion: boolean
}

export interface Admin {
    nombre: String,
    clave: String
}

export const ruta: any = {
    Url: 'https://ultimaentrega.herokuapp.com/'
}

