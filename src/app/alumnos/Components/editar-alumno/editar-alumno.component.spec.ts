import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnosService } from '../../Services/alumnos.service';
import { MatDialogRef } from '@angular/material/dialog'

import { EditarAlumnoComponent } from './editar-alumno.component';

describe('EditarAlumnoComponent', () => {
  let component: EditarAlumnoComponent;
  let fixture: ComponentFixture<EditarAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAlumnoComponent ],
      providers: [
        AlumnosService,
        MatDialogRef
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
