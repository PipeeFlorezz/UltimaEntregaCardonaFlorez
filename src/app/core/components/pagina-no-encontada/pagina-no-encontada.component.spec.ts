import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNoEncontadaComponent } from './pagina-no-encontada.component';

describe('PaginaNoEncontadaComponent', () => {
  let component: PaginaNoEncontadaComponent;
  let fixture: ComponentFixture<PaginaNoEncontadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaNoEncontadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaNoEncontadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
