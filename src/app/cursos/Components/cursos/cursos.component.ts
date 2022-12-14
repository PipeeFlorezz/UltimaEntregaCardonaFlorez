import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Curso } from 'src/app/models/models';
import { loadCursos } from '../../state/cursos.actions';
import { selectCursosCargados } from '../../state/cursos.selectors';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, OnDestroy {
  public Admin: boolean;
  public subscripcion!: Subscription;
  public cursos!: Curso[];

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.Admin = false;
  }

  ngOnInit(): void {
    let result: any = localStorage.getItem('usuarioLogueado');
    let usuarioLogueado = JSON.parse(result);
    if(usuarioLogueado.apellido && usuarioLogueado.apellido.length >= 1){
      this.Admin = false;
    }else {
      this.Admin = true;
    }
    this.traerCursos()
  }

  traerCursos() {
    this.subscripcion = this.store.select(selectCursosCargados).subscribe((cursos: Curso[]) => {
      if(cursos && cursos.length >= 1){
          this.cursos = cursos;
      }else{
        this.cursos = [];
      }
    });
  }



  crearCurso(){
    this.router.navigate(['/crearCurso']);

  }

  ngOnDestroy(): void {
    if(this.subscripcion) return this.subscripcion.unsubscribe();
  }

}
