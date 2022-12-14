import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from '../../Services/cursos.service';
import { Admin, alumno, Curso } from '../../../models/models'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InscribirEstudianteComponent } from '../inscribir-estudiante/inscribir-estudiante.component'
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {selectCursosCargados } from '../../state/cursos.selectors';
import { InscribirEstudiante, loadCursos } from '../../state/cursos.actions';
@Component({
  selector: 'app-curso-profile',
  templateUrl: './curso-profile.component.html',
  styleUrls: ['./curso-profile.component.css']
})
export class CursoProfileComponent implements OnInit, OnDestroy {

  public curso: Curso;
  public estudiantes!: alumno[];
  public estudiantess!: alumno[];
  public displayedColumns: string[];
  public subscripcion!: Subscription
  public subscripcio2!: Subscription
  public token: any;
  public admin: boolean = false;
  public cursos!: Curso[];
  public success: boolean = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private store: Store
  ) {
    this.displayedColumns = ['email', 'nombre', 'apellido', 'edad', 'pais', 'sexo'];
    //this.cursos = this.cursosService.llamarCursos();
    this.curso = {
      _id: '',
      profesor: '', nombre: '',
      inicia: new Date(),
      finaliza: new Date(),
      estudiantes: [{_id: '', email: '', nombre: '', apellido: '', edad: 0, pais: '', sexo: '', clave: ''}],
      imagen: '',
      inscripcion: true
    }
    this.store.dispatch(loadCursos());

  }

  ngOnInit(): void {
    this.usrLogueado();
    this.subscripcio2 =  this.route.params.subscribe((params: any) => {
      let id = params['id'];
      this.llamarCurso(id);
    });
  }

  llamarCurso(id: any){
    this.subscripcion = this.store.select(selectCursosCargados).subscribe((cursos: Curso[]) => {
        this.cursos = cursos;
        let curso: Curso[];
        if(this.cursos.length >= 1){
          curso = this.cursos.filter((elemento: Curso) => {
            return elemento._id == id;
          });
          this.curso = curso[0];
          this.estudiantes = curso[0].estudiantes;
        }else {
          return;
        }

    });
  }

  ngOnDestroy(): void {
    if(this.subscripcion) return this.subscripcion.unsubscribe();
    if(this.subscripcio2) return this.subscripcio2.unsubscribe();

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

  inscribirme(curso: Curso): void {
    let dialog = this.dialog.open(InscribirEstudianteComponent, {
      width: '65%',
      height: '77%'
    });

    dialog.beforeClosed().subscribe(estudiante => {
      if(estudiante === undefined || estudiante.length == 0 || estudiante.nombre.length == 0) return;
      this.store.dispatch(InscribirEstudiante({alumno: estudiante, cursoId: curso._id}));
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 5000);
    })
  }


  
}