import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AlumnosActions from './alumnos.actions';
import { AlumnosService } from '../Services/alumnos.service';
import { alumno } from 'src/app/models/models';


@Injectable()
export class AlumnosEffects {

  loadAlumnoss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AlumnosActions.loadAlumnos),
      concatMap(() =>
        this.alumnosServices.getAlumnos().pipe(
          map((alumnos: alumno[]) => AlumnosActions.loadAlumnosSuccess({ alumnos: alumnos })),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error }))))
      )
    );
  });

  /*createAlumnoss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AlumnosActions.createAlumno),
      concatMap(({alumno}) =>
        this.alumnosServices.crearAlumno(alumno).pipe(
          map((alumno: alumno) => {
            return AlumnosActions.loadAlumnos();
          }),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error }))))
      )
    );  
  });*/

  updateAlumnoss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AlumnosActions.updateAlumno),
      concatMap(({alumno}) =>
        this.alumnosServices.editarAlumno(alumno, alumno._id).pipe(
          map((alumno: alumno) => {
            if(alumno){
              alert('El estudiante ha sido actualizado con exito')
            }
            return AlumnosActions.loadAlumnos();
          }),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error }))))
      )
    );
  });

  /*deleteAlumnoss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AlumnosActions.deleteAlumno),
      concatMap(({alumno}) =>
        this.alumnosServices.eliminarAlumno(alumno._id).pipe(
          map((alumnos: alumno) => {
            return AlumnosActions.loadAlumnos();
          }),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error }))))
      )
    );
  });*/




  constructor(private actions$: Actions, private alumnosServices: AlumnosService) {}
}
