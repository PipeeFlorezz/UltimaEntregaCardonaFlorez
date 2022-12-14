import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin, alumno } from '../../models/models';
import { ruta } from '../../models/models';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  public url: string;
  constructor(
    private http: HttpClient
    
  ) { 
    this.url = ruta.Url;
  }

  crearAdmin(admin: Admin): Observable<any> {
    let data = JSON.stringify(admin);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this.http.post(this.url + 'createAdmin', data, {headers: headers})
  }

  loguinUsuario(alumno: alumno): Observable<any> {
    let data = JSON.stringify(alumno);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this.http.post(this.url + 'loguinUsuario', data, {headers: headers})
  }
}
