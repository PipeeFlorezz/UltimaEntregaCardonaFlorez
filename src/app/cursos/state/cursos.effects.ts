import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as CursosActions from './cursos.actions';
import { CursosService } from '../Services/cursos.service';
import { Curso } from 'src/app/models/models';


@Injectable()
export class CursosEffects {

  constructor(private actions$: Actions, private cursosServices: CursosService) {}

  loadCursoss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CursosActions.loadCursos),
      concatMap(() => this.cursosServices.getCursos().pipe(
          map((cursos: Curso[]) => CursosActions.loadCursosSuccess({ cursos: cursos })),
          catchError(error => of(CursosActions.loadCursosFailure({ error }))))
      )
    );
  });

  InscribirEstudiante$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CursosActions.InscribirEstudiante),
      concatMap(({alumno, cursoId}) => this.cursosServices.inscribirEstudiante(alumno, cursoId).pipe(
          map((data: Curso) => {
            return CursosActions.loadCursos();
          }),
          catchError(error => of(CursosActions.loadCursosFailure({ error }))))
      )
    );
  });

 /*createCursoss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CursosActions.createCurso),
      concatMap(({curso}) => this.cursosServices.crearCurso(curso).pipe(
          map((curso: Curso) => CursosActions.loadCursos()),
          catchError(error => of(CursosActions.loadCursosFailure({ error }))))
      )
    );
  });

  updateCursoss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CursosActions.updateCurso),
      concatMap(({curso}) => this.cursosServices.editarCurso(curso, curso._id).pipe(
          map((curso: Curso) => CursosActions.loadCursos()),
          catchError(error => of(CursosActions.loadCursosFailure({ error }))))
      )
    );
  });

  deleteCursoss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CursosActions.deleteCurso),
      concatMap(({curso}) => this.cursosServices.eliminarCurso(curso._id).pipe(
          map((curso: Curso) => CursosActions.loadCursos()),
          catchError(error => of(CursosActions.loadCursosFailure({ error }))))
      )
    );
  });*/

}
