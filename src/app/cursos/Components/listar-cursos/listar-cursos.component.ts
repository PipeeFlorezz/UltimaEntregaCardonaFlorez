import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/models';
import { CursosService } from '../../Services/cursos.service';
import { loadCursos } from '../../state/cursos.actions';
import { selectCursosCargados } from '../../state/cursos.selectors';
import { EliminarCursoComponent } from '../eliminar-curso/eliminar-curso.component';
@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit, OnDestroy {

  public admin: boolean = false;
  public cursos: Curso[];
  public subscripcion!: Subscription;
  public subscripcion2!: Subscription;
  public cursoEliminado: boolean = false;
  public sppiner: boolean = true;

  constructor(
    private router: Router,
    private cursosService: CursosService,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.store.dispatch(loadCursos())
    this.cursos =  [];
  }

  ngOnInit(): void {
    this.usrLogueado();
    this.traerCursos();

  }

  usrLogueado(){
    let user: any, result: any = localStorage.getItem('usuarioLogueado');
    user = JSON.parse(result);
    if(user.apellido && user.apellido.length >= 1){
      this.admin = false;
    }else {
      this.admin = true;
    }
  }

  traerCursos() {
    this.subscripcion = this.store.select(selectCursosCargados).subscribe((cursos: Curso[]) => {
      if(cursos && cursos.length >= 1 || cursos.length >= 0){
        setTimeout(() => {
          this.cursos = cursos;
          this.sppiner = false;
        }, 2000);
      }else{
        return;
      }
    });
  }

  cursoPerfil(curso: Curso){
    this.router.navigate(['/cursos/cursoPerfil/', curso._id])
  }

  editarCurso(curso: Curso){
    let Curso: any = JSON.stringify(curso);
    localStorage.setItem('editarCurso', Curso)
    this.router.navigate(['/editarCurso', curso._id])
  }

  eliminarCurso(curso: Curso){
    let dialog = this.dialog.open(EliminarCursoComponent, {
      width: '46%',
      height: '25%'
    })

    dialog.beforeClosed().subscribe(res => {
      if(res) {
        this.cursoEliminado = true
        this.subscripcion2 = this.cursosService.eliminarCurso(curso._id).subscribe(
          res => {
            this.store.dispatch(loadCursos())
            this.subscripcion = this.store.select(selectCursosCargados).subscribe((cursos: Curso[]) => {
              if(cursos && cursos.length >= 1 || cursos.length == 0){
                setTimeout(() => {
                  this.sppiner = false;
                  this.cursoEliminado = false
                }, 3000);
              }else{
                return;
              }
            });
    
          }
        )
      } else {
        return;
      }
    })


  }

  ngOnDestroy(): void {
    if(this.subscripcion) return this.subscripcion.unsubscribe();
    if(this.subscripcion2) return this.subscripcion2.unsubscribe();

  }


}
