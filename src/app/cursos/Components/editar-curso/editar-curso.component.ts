import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Curso, alumno } from '../../../models/models'
import { CursosService } from 'src/app/cursos/Services/cursos.service';
import { updateCurso } from '../../state/cursos.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {


  public subscripcion!: Subscription
  public curso: any;
  public id: any;
  public formCurso: FormGroup;
  public dataSuccess: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private router: Router,
    private store: Store
  ) { 

    let result: any = localStorage.getItem('editarCurso');
    let resultf = JSON.parse(result);
    this.curso = resultf;

    this.formCurso = this.formBuilder.group({
      profesor: [this.curso.profesor, [Validators.required]],
      nombre: [this.curso.nombre, [Validators.required]],
      inicia: [this.curso.inicia, [Validators.required]],
      finaliza: [this.curso.finaliza, [Validators.required]],
      inscripcion: [this.curso.inscripcion, [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

    })
  }

  ngOnDestroy(): void {
    if(this.subscripcion) return this.subscripcion.unsubscribe();
  }


  editarCurso() {
    this.curso = this.formCurso.value;
    this.curso._id = this.id;
    this.subscripcion = this.cursosService.editarCurso(this.curso, this.curso._id).subscribe(
      res => {
        this.dataSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/cursos']);
          this.dataSuccess = false;
        }, 2500);
      }
    )
    /*this.store.dispatch(updateCurso({ curso: this.curso }));
    this.dataSuccess = true;
    setTimeout(() => {
      this.router.navigate(['/cursos']);
      this.dataSuccess = false;
    }, 2500);*/
  }

  /*editarCurso() {
    this.cursosService.editarCurso(this.formCurso.value, this.id).subscribe(
      res => {

        localStorage.removeItem('editarCurso')
        this.router.navigate(['/cursos']);
      }
    )
  }*/
  
}
