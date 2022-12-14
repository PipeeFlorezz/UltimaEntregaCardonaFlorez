import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarCursoComponent } from './Components/editar-curso/editar-curso.component';
import { CursosComponent } from './Components/cursos/cursos.component';
import { CursoProfileComponent } from './Components/curso-profile/curso-profile.component';
import { ListarCursosComponent } from './Components/listar-cursos/listar-cursos.component';
import { CrearCursoComponent } from './Components/crear-curso/crear-curso.component';

const routes: Routes = [
  { path: 'editarCurso/:id', component: EditarCursoComponent },
  { path: 'crearCurso', component: CrearCursoComponent},
  {
    path: 'cursos', component: CursosComponent,
    children: [
      { path: '', redirectTo: 'listaCursos', pathMatch: 'full' },
      { path: 'listaCursos', component: ListarCursosComponent},
      { path: 'cursoPerfil/:id', component: CursoProfileComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
