import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosService } from '../../Services/cursos.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CursoProfileComponent } from './curso-profile.component';

describe('CursoProfileComponent', () => {
  let component: CursoProfileComponent;
  let fixture: ComponentFixture<CursoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoProfileComponent ],
      imports: [
        MatDialog, MatDialogRef
      ],
      providers: [
        CursosService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
