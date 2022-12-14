import { createAction, props } from '@ngrx/store';
import { alumno, Curso } from 'src/app/models/models';

export const loadCursos = createAction(
  '[Cursos] Load Cursoss'
);

export const loadCursosSuccess = createAction(
  '[Cursos] Load Cursoss Success',
  props<{ cursos: Curso[] }>()
);

export const createCurso = createAction(
  '[Cursos] Load Cursoss Success',
  props<{ curso: Curso, file: any }>()
);

export const updateCurso = createAction(
  '[Cursos] Load Cursoss Success',
  props<{ curso: Curso }>()
);

export const InscribirEstudiante = createAction(
  '[Cursos] Inscripcion a un Curso',
  props<{ alumno: alumno, cursoId: any }>()
);

export const deleteCurso = createAction(
  '[Cursos] Load Cursoss Success',
  props<{ curso: Curso }>()
);

export const loadCursosFailure = createAction(
  '[Cursos] Load Cursoss Failure',
  props<{ error: any }>()
);
