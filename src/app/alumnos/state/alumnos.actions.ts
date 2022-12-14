import { createAction, props } from '@ngrx/store';
import { alumno } from 'src/app/models/models';

export const loadAlumnos = createAction(
  '[Alumnos] Load Alumnoss'
);

export const loadAlumnosSuccess = createAction(
  '[Alumnos] Load Alumnoss Success',
  props<{ alumnos: alumno[] }>()
);

export const createAlumno = createAction(
  '[Alumnos] Loaded Alumnoss',
  props<{ alumno: alumno }>()
);

export const updateAlumno = createAction(
  '[Alumnos] Loaded Alumnoss',
  props<{ alumno: alumno }>()
);

export const deleteAlumno = createAction(
  '[Alumnos] Loaded Alumnoss',
  props<{ alumno: alumno }>()
);

export const loadAlumnosFailure = createAction(
  '[Alumnos] Load Alumnoss Failure',
  props<{ error: any }>()
);
