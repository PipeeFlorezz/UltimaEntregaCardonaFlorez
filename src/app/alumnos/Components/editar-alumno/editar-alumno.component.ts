import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'
import { alumno } from 'src/app/models/models';
import { AlumnosService } from '../../Services/alumnos.service';

interface genero {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

  public formAlumno: FormGroup;
  public alumno: alumno
  public id: any;
  public Generos: genero[];


  constructor(
    private matDialogRef: MatDialogRef<EditarAlumnoComponent>,
    private alumnosSrrvices: AlumnosService,
    private formBuilder: FormBuilder,
  ) {

    let result: any = localStorage.getItem('editarAlumno');
    let resultf = JSON.parse(result);
    this.id = resultf._id;
    this.alumno = resultf; 

    this.Generos = [
      {value: 'genero-0', viewValue: 'Masculino'},
      {value: 'genero-1', viewValue: 'Femenino'},
    ];

    this.formAlumno = this.formBuilder.group({
      email: [this.alumno.email, [Validators.required]],
      nombre: [this.alumno.nombre, [Validators.required]],
      apellido: [this.alumno.apellido, [Validators.required]],
      edad: [this.alumno.edad, [Validators.required, Validators.min(15), this.ValidateAge()]],
      pais: [this.alumno.pais, [Validators.required]],
      sexo: [this.alumno.sexo, [Validators.required]],
      clave: [this.alumno.clave, [Validators.required]]
      //skills: new FormArray([new FormControl])

    });
   }

  ngOnInit(): void {

  }

  editarAlumno(){
    this.matDialogRef.close(this.formAlumno.value);
  }

  ValidateAge(): ValidatorFn {
    return (control: AbstractControl): { [key: string ]: any} | null => {
      return (!Number.isInteger(parseInt(control.value))) ? { failAge: true } : null;
    }
  }


}
