import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnosService } from '../../Services/alumnos.service';

import { CearAlumnoComponent } from './cear-alumno.component';

describe('CearAlumnoComponent', () => {
  let component: CearAlumnoComponent;
  let fixture: ComponentFixture<CearAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CearAlumnoComponent ],
      providers: [
        AlumnosService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CearAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
