import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Curso } from 'src/app/models/models';
import { CursosService } from '../../Services/cursos.service';
import { createCurso, loadCursos } from '../../state/cursos.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {


  public curso!: Curso;
  public formCurso: FormGroup
  public uploadFile: File[];
  public dataSuccess!: boolean;
  public subscripcion!: Subscription
  constructor(
    private formBuilder: FormBuilder,
    private cursoServices: CursosService,
    private router: Router,
    private store: Store
  ) {
    this.store.dispatch(loadCursos());

    this.uploadFile = [];
    this.formCurso = this.formBuilder.group({
      profesor: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      inicia: ['', [Validators.required]],
      finaliza: ['', [Validators.required]],
      inscripcion: ['', [Validators.required]],
    });
  }



  ngOnInit(): void {
  }

  // Patron redux
  /*if(this.uploadFile){
    this.store.dispatch(createCurso({curso: this.curso, file: this.uploadFile}))
    this.dataSuccess = true;
    setTimeout(() => {
      this.router.navigate(['/cursos']);
      this.dataSuccess = false
    }, 2500);
  }*/

  crearCurso() {

    this.curso = this.formCurso.value
    this.subscripcion = this.cursoServices.crearCurso(this.curso, this.uploadFile).subscribe(
      res => {

        this.dataSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/cursos']);
          this.dataSuccess = false;
        }, 4100);
      }
    )
  }

  noCurso(){
    return;
  }

  ngOnDestroy(): void {
    if (this.subscripcion) return this.subscripcion.unsubscribe();
  }


  subirImg(event: any) {
    this.uploadFile = <Array<File>>event.target.files[0];
    //this.uploadFile = event.target.files[0];
  }

}


