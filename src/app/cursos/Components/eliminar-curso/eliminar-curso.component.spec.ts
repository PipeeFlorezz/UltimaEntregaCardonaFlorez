import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnosService } from 'src/app/alumnos/Services/alumnos.service';
import { CursosService } from '../../Services/cursos.service';
import { MatDialogRef } from '@angular/material/dialog';

import { EliminarCursoComponent } from './eliminar-curso.component';

describe('EliminarCursoComponent', () => {
  let component: EliminarCursoComponent;
  let fixture: ComponentFixture<EliminarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCursoComponent ],
      providers: [
        CursosService,
        MatDialogRef
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
