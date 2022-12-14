import { style } from '@angular/animations';
import { Component, NgModuleFactory, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, FormGroup, NgForm } from '@angular/forms'
import { Admin, alumno } from '../../../models/models';
import { Router } from '@angular/router';
import { AlumnosService } from '../../../alumnos/Services/alumnos.service';
import { Subscription } from 'rxjs';
import { AdminService } from '../../Services/admin.service';
interface Usuario {
  value: string;
  viewValue: string;
}

interface genero {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.component.html',
  styleUrls: ['./registro-login.component.css']
})
export class RegistroLoginComponent implements OnInit, OnDestroy {

  public dataSuccess!: boolean;
  public yaExiste: boolean = false;
  public admin: Admin;
  public alumno: alumno;
  public Admin!: boolean;
  public Alumno!: boolean;
  public primerForm: boolean;
  public Usuario!: string;
  public subscripcion!: Subscription;
  public Registro!: boolean;
  public Login: boolean = true;
  public imagenInicio: boolean = false;
  public Usuarios: Usuario[];
  public elegirUsuario: FormGroup;
  public formAdmin: FormGroup;
  public loginForm: FormGroup;
  public formRegistro: FormGroup;
  public Generos: genero[];

  constructor(
    private router: Router,
    private alumnoServices: AlumnosService,
    private adminServices: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.admin = { nombre: '', clave: '' };
    this.alumno = { _id: '', email: '', nombre: '', apellido: '', edad: 0, pais: '', sexo: '', clave: '' }
    this.primerForm = true;

    this.Usuarios = [
      {value: 'usuario-0', viewValue: 'Administrador'},
      {value: 'usuario-1', viewValue: 'Alumno'},
    ];

    this.Generos = [
      {value: 'genero-0', viewValue: 'Masculino'},
      {value: 'genero-1', viewValue: 'Femenino'},
    ];

    this.elegirUsuario = this.formBuilder.group({
      usuario: ['', [Validators.required]],
    });

    this.formAdmin = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });

    this.formRegistro = this.formBuilder.group({
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

  ValidateAge(): ValidatorFn {
    return (control: AbstractControl): { [key: string ]: any} | null => {
      return (!Number.isInteger(parseInt(control.value))) ? { failAge: true } : null;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //if(this.subscripcion) this.subscripcion.unsubscribe();

  }

  formUsuario(elegirUsuario: FormGroup) {
    if (this.elegirUsuario.value.usuario == 'Administrador') {
      this.primerForm = false;
      this.Alumno = false;
      this.Admin = true;
      elegirUsuario.reset();
    } else {
      this.primerForm = false;
      this.Alumno = true;
      this.Admin = false;
      elegirUsuario.reset();
    }
  }


  adminForm() {
    this.primerForm = false;
    this.Alumno = false;
    this.Admin = false;
    this.admin = this.formAdmin.value
    this.adminServices.crearAdmin(this.admin).subscribe(
      res => {
        let token: any = JSON.stringify(res.token)
        localStorage.setItem('token', token);
        let admin = JSON.stringify(res.Admin)
        localStorage.setItem('usuarioLogueado', admin)
        this.dataSuccess = true;

      }
    )

    setTimeout(() => {
      document.querySelector('.acceder')?.classList.add('cerrar');
      this.router.navigate(['/alumnos']);
    }, 3000);
  }


  RegistroForm(form: FormGroup) {
    this.primerForm = false;
    this.Admin = false;
    this.alumno = this.formRegistro.value;
    this.alumnoServices.crearAlumno(this.alumno).subscribe(
      res => {
        if (res.yaExiste) {
          this.yaExiste = true;
          setTimeout(() => {
            this.yaExiste = false;
            form.reset();
          }, 3100);
          return;
        }
        if (res.token && res.token.length >= 1 && res.alumnoGuardado) {
          this.dataSuccess = true;
          let token = JSON.stringify(res.token);
          localStorage.setItem('token', token);
          let usuario = JSON.stringify(res.alumnoGuardado)
          localStorage.setItem('usuarioLogueado', usuario);
          this.Alumno = false;
          this.alumno = res.alumnoGuardado;

          setTimeout(() => {
            this.router.navigate(['/alumnos']);
            document.querySelector('.acceder')?.classList.add('cerrar');
          }, 3000);
          return;
        }
      }
    )
  }


  loguearAlumno() {
    this.primerForm = false;
    this.Alumno = false;
    this.Admin = false;

    this.alumno = this.loginForm.value;

    this.adminServices.loguinUsuario(this.alumno).subscribe(
      res => {
        if(res.noUser){
          alert('Este usuario no existe, registrate');
          this.Alumno = true;
          this.Login = false;
          this.Registro = true;
          return;
        }
        if(res[0].email && res[0].email.length >= 1){
          this.dataSuccess = true;
          let token = JSON.stringify(res[1]);
          localStorage.setItem('token', token);
          let usuario = JSON.stringify(res[0])
          localStorage.setItem('usuarioLogueado', usuario);
          this.alumno = res.alumnoGuardado;
          setTimeout(() => {
            this.router.navigate(['/alumnos']);
            document.querySelector('.acceder')?.classList.add('cerrar');
          }, 3000);
          return;
        }
      }
    )

  }


  loguearme(form: FormGroup) {
    this.Registro = false;
    this.Login = true;
    form.reset();
  }

  registrarme(form: FormGroup) {
    this.Registro = true;
    this.Login = false;
    form.reset();
  }

  regresar(formAdmin: FormGroup){
    this.primerForm = true;
    this.Admin = false;
    this.Alumno = false;
    formAdmin.reset();
  }


}
