import { alumno } from "src/app/models/models";

export interface alumnosState {
    cargando: boolean,
    alumnos: alumno[];
}