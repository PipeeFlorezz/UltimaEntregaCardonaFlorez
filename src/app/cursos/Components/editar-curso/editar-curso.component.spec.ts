import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnosService } from 'src/app/alumnos/Services/alumnos.service';
import { CursosService } from '../../Services/cursos.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { EditarCursoComponent } from './editar-curso.component';

describe('EditarCursoComponent', () => {
  let component: EditarCursoComponent;
  let fixture: ComponentFixture<EditarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCursoComponent ],
      providers: [
        CursosService,
        FormBuilder, FormGroup, NgForm, Validators

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
