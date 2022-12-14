import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './Components/alumnos/alumnos.component';
import { CearAlumnoComponent } from './Components/cear-alumno/cear-alumno.component';
import { ListaAlumnosComponent } from './Components/lista-alumnos/lista-alumnos.component';

const routes: Routes = [
  {path: 'crearAlumno', component: CearAlumnoComponent},
  {
    path: 'alumnos', component: AlumnosComponent,
  children: [
    { path: '', redirectTo: 'lista-alumnos', pathMatch: 'full' },
    {path:'lista-alumnos', component: ListaAlumnosComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
