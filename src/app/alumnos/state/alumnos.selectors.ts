import { createFeatureSelector, createSelector } from '@ngrx/store';
import { alumnosState } from '../models/alumnosState';
import * as fromAlumnos from './alumnos.reducer';

export const selectAlumnosState = createFeatureSelector<alumnosState>(
  fromAlumnos.alumnosFeatureKey
);

export const selectCargandoAlumnos = createSelector(
  selectAlumnosState,
  (state: alumnosState) => state.cargando
)

export const selectAlumnosCargados = createSelector(
  selectAlumnosState,
  (state: alumnosState) => state.alumnos
)