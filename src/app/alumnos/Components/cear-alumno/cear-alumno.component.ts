import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { alumno } from 'src/app/models/models';
import { AlumnosService } from '../../Services/alumnos.service';
import { createAlumno } from '../../state/alumnos.actions';
import {  Subscription } from 'rxjs';

interface genero {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-cear-alumno',
  templateUrl: './cear-alumno.component.html',
  styleUrls: ['./cear-alumno.component.css']
})
export class CearAlumnoComponent implements OnInit, OnDestroy {

  public dataSuccess!: boolean;
  public formAlumno: FormGroup;
  public alumno: alumno;
  public id: any;
  public Generos: genero[];
  public form: any;
  public subscripcion!: Subscription
  constructor(
    private alumnosSrrvices: AlumnosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {

    this.Generos = [
      {value: 'genero-0', viewValue: 'Masculino'},
      {value: 'genero-1', viewValue: 'Femenino'},
    ];

    this.formAlumno = this.formBuilder.group({
      email: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(15), this.ValidateAge()]],
      pais: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });

    this.alumno = {_id: '', email: '', nombre: '', apellido: '', edad:0, pais:'', sexo:'', clave:''}
  }


  ngOnInit(): void {
    
  }

  crearAlumno(){
    this.alumno = this.formAlumno.value;
    this.subscripcion =  this.alumnosSrrvices.crearAlumno(this.alumno).subscribe(
      res => {

        this.dataSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/alumnos']);
          this.dataSuccess = false;
          //this.formAlumno.reset();
        }, 2000);
      }
    )
    // Profesor en esta ocacion utilize el servicio directamente ya que por mas que intente crear el alumno a traves de mi action crearalumno no se pudo
    // no se que sucede pero no dispara la action de crear pero si me funcionan el resto de acciones
    // no se que es lo que estara pasando igual abajo te dejo la logica completa dejandote ver que aplique bien la logica del codigo
    /*this.store.dispatch(createAlumno({alumno: this.alumno}));
    setTimeout(() => {
      this.router.navigate(['/alumnos']);
      this.formAlumno.reset();
    }, 2000);*/
  }

  ngOnDestroy(): void {
    if(this.subscripcion) return this.subscripcion.unsubscribe();
  }


  ValidateAge(): ValidatorFn {
    return (control: AbstractControl): { [key: string ]: any} | null => {
      return (!Number.isInteger(parseInt(control.value))) ? { failAge: true } : null;
    }
  }

  noCrear(){
    return;
  }

}