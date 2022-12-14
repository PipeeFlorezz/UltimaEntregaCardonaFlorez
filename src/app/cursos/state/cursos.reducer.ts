import { Action, createReducer, on } from '@ngrx/store';
import { cursoState } from '../models/cursoState';
import * as CursosActions from './cursos.actions';

export const cursosFeatureKey = 'cursos';

export const initialState: cursoState = {
  cargando: false,
  cursos: []
};

export const reducer = createReducer(
  initialState,

  on(CursosActions.loadCursos, (state, action) => {
    let finalState: cursoState = {
      cargando: true,
      cursos: []
    }
    return finalState;
  }),
  on(CursosActions.loadCursosSuccess, (state, action) => {
    let finalState: cursoState = {
      cargando: false,
      cursos: action.cursos
    }
    return finalState;
  }),
  on(CursosActions.loadCursosFailure, (state, action) => {
    let finalState: cursoState = {
      ...state,
      cargando: false,
      cursos: []
    }
    return finalState;
  }),

);
