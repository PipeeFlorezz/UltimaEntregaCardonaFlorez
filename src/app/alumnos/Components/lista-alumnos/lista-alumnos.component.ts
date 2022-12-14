import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlumnosService } from '../../Services/alumnos.service';
import { EliminarAlumnoComponent } from '../eliminar-alumno/eliminar-alumno.component';
import { Admin, alumno } from '../../../models/models';
import { Subscription } from 'rxjs';
import { EditarAlumnoComponent } from '../editar-alumno/editar-alumno.component';
import { selectAlumnosCargados } from '../../state/alumnos.selectors';
import { Store } from '@ngrx/store';
import { deleteAlumno, loadAlumnos, updateAlumno } from '../../state/alumnos.actions';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {
  public sppiner!: boolean;
  public alumnos: alumno[];
  public displayedColumns: string[];
  public admin: boolean;
  public alumno: boolean;
  public Admin!: Admin;
  public Alumno!: alumno;
  public subscripcion1!: Subscription;
  public subscripcion2!: Subscription
  constructor(
    public Dialog: MatDialog,
    private router: Router,
    private alumnosServicios: AlumnosService,
    private store: Store
  ) {
    this.store.dispatch(loadAlumnos())
    this.alumnos = [];
    this.admin = false;
    this.alumno = false;
    this.displayedColumns = ['email', 'nombre', 'apellido', 'edad', 'pais', 'sexo'];
  }

  ngOnInit(): void {
    this.usuarioLogueado();
    this.traerAlumnos();

  }

  ngOnDestroy(): void {
    if (this.subscripcion1) return this.subscripcion1.unsubscribe();
    if (this.subscripcion2) return this.subscripcion2.unsubscribe();
  }

  traerAlumnos() {

    this.subscripcion1 = this.store.select(selectAlumnosCargados).subscribe((alumnos: alumno[]) => {

      if (alumnos && alumnos.length >= 1 || alumnos.length == 0) {
        this.sppiner = true;
        setTimeout(() => {
          this.alumnos = alumnos;
          this.sppiner = false;
        }, 1500);
      }
    });

  }

  eliminarAlumno(Alumno: alumno) {
    let dialog = this.Dialog.open(EliminarAlumnoComponent, {
      width: '46%',
      height: '25%'
    })

    dialog.beforeClosed().subscribe(res => {
      if (res == 'Eliminar') {
        this.subscripcion2 = this.alumnosServicios.eliminarAlumno(Alumno._id).subscribe(
          res => {
            alert('El estudiante ha sido eliminado con exito')
            this.store.dispatch(loadAlumnos());
            this.alumnos = [];

          }
        )
      } else {
        return;
      }
    })
  }

  editarAlumno(Alumno: alumno) {
    let alumno: any = JSON.stringify(Alumno);
    localStorage.setItem('editarAlumno', alumno)
    let dialog = this.Dialog.open(EditarAlumnoComponent, {
      width: '75%',
      height: '65%'
    })

    dialog.beforeClosed().subscribe(alumno => {
      localStorage.removeItem('editarAlumno')
      if(alumno){
        alumno._id = Alumno._id;
        this.store.dispatch(updateAlumno({ alumno: alumno }));
        this.alumnos = [];
      }else {
        return;
      }
    })
  }

  usuarioLogueado() {
    let result: any = localStorage.getItem('usuarioLogueado');
    let usuarioLogueado = JSON.parse(result);
    if (usuarioLogueado.apellido && usuarioLogueado.apellido.length >= 1) {
      this.admin = false;
    }else {
      this.admin = true;
      this.displayedColumns.push('accion')
    }
  }

}
