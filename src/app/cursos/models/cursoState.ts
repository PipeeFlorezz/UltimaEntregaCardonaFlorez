import { Curso } from "src/app/models/models";

export interface cursoState {
    cargando: boolean,
    cursos: Curso[];
}