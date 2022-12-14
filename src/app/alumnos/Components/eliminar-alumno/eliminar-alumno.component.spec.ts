import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnosService } from '../../Services/alumnos.service';
import { MatDialogRef } from '@angular/material/dialog'

import { EliminarAlumnoComponent } from './eliminar-alumno.component';

describe('EliminarAlumnoComponent', () => {
  let component: EliminarAlumnoComponent;
  let fixture: ComponentFixture<EliminarAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAlumnoComponent ],
      providers: [
        AlumnosService,
        MatDialogRef
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
