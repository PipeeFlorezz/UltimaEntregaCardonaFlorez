import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnosService } from 'src/app/alumnos/Services/alumnos.service';
import { CursosService } from '../../Services/cursos.service';
import { FormBuilder, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms'

import { InscribirEstudianteComponent } from './inscribir-estudiante.component';

describe('InscribirEstudianteComponent', () => {
  let component: InscribirEstudianteComponent;
  let fixture: ComponentFixture<InscribirEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscribirEstudianteComponent ],
      imports: [
        FormBuilder, Validators, FormGroup
      ],
      providers: [
        CursosService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscribirEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
