import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';
import { AlumnosService } from '../../../alumnos/Services/alumnos.service';

import { RegistroLoginComponent } from './registro-login.component';

describe('RegistroLoginComponent', () => {
  let component: RegistroLoginComponent;
  let fixture: ComponentFixture<RegistroLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroLoginComponent ],
      providers:[
        AdminService,
        AlumnosService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
