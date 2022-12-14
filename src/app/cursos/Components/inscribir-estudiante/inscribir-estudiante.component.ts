import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms'
import { CursosService } from 'src/app/cursos/Services/cursos.service';
import { Subscription } from 'rxjs';
import { Admin, alumno, Curso } from '../../../models/models';
interface genero {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-inscribir-estudiante',
  templateUrl: './inscribir-estudiante.component.html',
  styleUrls: ['./inscribir-estudiante.component.css']
})
export class InscribirEstudianteComponent implements OnInit {

  public formAlumno: FormGroup;
  public Generos: genero[];
  public admin!: boolean;
  public alumno: boolean = true;;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<InscribirEstudianteComponent>

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
      //skills: new FormArray([new FormControl])

    });
  }

  ngOnInit(): void {
    this.usrLogueado()
  }

  inscribirAlumno(){
    let data: alumno = this.formAlumno.value
    this.matDialogRef.close(data);
  }

  usrLogueado(){
    let user: any, result: any = localStorage.getItem('usuarioLogueado');
    user = JSON.parse(result);
    if(user.apellido && user.apellido.length >= 1){
      this.admin = false;
      this.alumno = true;
    }else {
      this.admin = true;
      this.alumno = false;
    }
  }

  ValidateAge(): ValidatorFn {
    return (control: AbstractControl): { [key: string ]: any} | null => {
      return (!Number.isInteger(parseInt(control.value))) ? { failAge: true } : null;
    }
  }

}