import { Action, createReducer, on } from '@ngrx/store';
import { alumnosState } from '../models/alumnosState';
import * as AlumnosActions from './alumnos.actions';

export const alumnosFeatureKey = 'alumnos';

export const initialState: alumnosState = {
  cargando: false,
  alumnos: []
};

export const reducer = createReducer(
  initialState,

  on(AlumnosActions.loadAlumnos, (state, action) => {
    let finalState: alumnosState = {
      cargando: true,
      alumnos: []
    }
    return finalState;
  }),
  on(AlumnosActions.loadAlumnosSuccess, (state, action) => {
    let finalState: alumnosState = {
      cargando: false,
      alumnos: action.alumnos
    }
    return finalState
  }),
  on(AlumnosActions.loadAlumnosFailure, (state, action) => {
    let finalState: alumnosState = {
      ...state,
      cargando: false,
      alumnos: []
    }
    return finalState;
  }),

);
