import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin, alumno } from 'src/app/models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuarioLogueado: any;
  public admin: boolean;
  public alumno: boolean;
  public Admin: Admin
  public Alumno: alumno
  constructor(
    private router: Router
  ) { 
    this.Admin = {nombre: '', clave: ''};
    this.Alumno = {_id: '',email: '', nombre: '', apellido: '', edad: 0, pais: '', sexo: '', clave: ''};
    this.usuarioLogueado = {nombre: 'incognito', clave: '123'};
    this.admin = true;
    this.alumno = false;
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    let data: any = localStorage.getItem('usuarioLogueado')
    if(!data){
      return;
    }else{
      if(data.nombre == 'administrador' || data.nombre == 'Administrador'){
        this.admin = true;
        this.alumno = false;
        this.Admin = JSON.parse(data);
      }else {
        this.admin = false;
        this.alumno = true;
        this.Alumno = JSON.parse(data);
      }
    }

  }

  cursosRoute(){
    this.router.navigate(['/cursos']);
  }

  alumnosRoute(){
    this.router.navigate(['/alumnos']);
  }

  desloguearse(){
    //localStorage.removeItem('usuarioLogueado');
    setTimeout(() => {
      this.router.navigate(['/registro']);
      localStorage.clear();
    }, 1200);
  }
}
