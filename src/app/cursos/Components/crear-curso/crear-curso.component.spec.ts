import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CursosService } from '../../Services/cursos.service';

import { CrearCursoComponent } from './crear-curso.component';

describe('CrearCursoComponent', () => {
  let component: CrearCursoComponent;
  let fixture: ComponentFixture<CrearCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCursoComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,

        FormBuilder
      ],
      providers: [
        CursosService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
    it('El formulario se inactiva si no se ingresan todos los campos', () => {
    const formulario =  component.formCurso;
    
    const profesor = formulario.controls['profesor']
    const nombre = formulario.controls['nombre']
    const inicia = formulario.controls['inicia']
    const finaliza = formulario.controls['finaliza']
    const imagen = formulario.controls['imagen']
    const inscripcion= formulario.controls['inscripcion']

    profesor.setValue('');
    nombre.setValue('rodiguez')
    inicia.setValue('')
    finaliza.setValue('')
    imagen.setValue('')
    inscripcion.setValue('')

    fixture.detectChanges();

    let boton = fixture.debugElement.query(By.css('#buttonCrearCurso'));
    boton.nativeElement.click();

    expect(formulario.valid).toBeFalse();
  });
  */
});
