import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { alumno } from '../../models/models';
import { ruta } from '../../models/models'
@Injectable()
export class AlumnosService {

  public url: string;
  constructor(
    private http: HttpClient 
  ) { 

    this.url = ruta.Url;
  }

  getAlumnos(): Observable<any> { 
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('authorization', this.getToken());

    return this.http.get(this.url+ 'alumnos', {headers: headers})
  }

  crearAlumno(Alumno: alumno): Observable<any> {
    let data = JSON.stringify(Alumno);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   
    return this.http.post<alumno>(this.url + 'crearALumno', data, {headers: headers})
  }

  editarAlumno(Alumno: alumno, id: any): Observable<any> {
    let data = JSON.stringify(Alumno);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('authorization', this.getToken());

    return this.http.put(this.url + 'alumno/editar/'+ `${id}`, data, {headers: headers})
  }

  eliminarAlumno(id: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('authorization', this.getToken()); 
    return this.http.delete(this.url+ 'alumno/delete/' + `${id}`, {headers: headers})                              
  }


  getToken(): any {
    let result: any = localStorage.getItem('token');
    let token = JSON.parse(result);
    if(!token){
      return 'No token';
    }else {
      return token;
    }
  }

  
}

