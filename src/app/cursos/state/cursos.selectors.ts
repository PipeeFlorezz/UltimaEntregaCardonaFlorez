import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cursoState } from '../models/cursoState';
import * as fromCursos from './cursos.reducer';

export const selectCursosState = createFeatureSelector<cursoState>(
  fromCursos.cursosFeatureKey
);

export const selectCargandoCursos = createSelector(
  selectCursosState,
  (state: cursoState) => state.cargando
)

export const selectCursosCargados = createSelector(
  selectCursosState,
  (state: cursoState) => state.cursos
)