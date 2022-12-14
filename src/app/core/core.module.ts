import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../angularMaterial/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroLoginComponent } from './components/registro-login/registro-login.component';
import { PaginaNoEncontadaComponent } from './components/pagina-no-encontada/pagina-no-encontada.component';
import { AlumnosService } from '../alumnos/Services/alumnos.service';



@NgModule({
  declarations: [
    HeaderComponent,
    RegistroLoginComponent,
    PaginaNoEncontadaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AlumnosService
  ]
})

export class CoreModule { }
