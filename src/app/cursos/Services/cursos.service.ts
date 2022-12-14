import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subject } from 'rxjs';
import { alumno, Curso } from '../../models/models';
import { ruta } from '../../models/models'
@Injectable()
export class CursosService {

    public cursos!: Curso[];
    url: string;


    constructor(
        private http: HttpClient
    ) {
        this.url = ruta.Url;
    }

    inscribirEstudiante(estudiante: alumno, id: any): Observable<any> {
        let data = JSON.stringify(estudiante);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('authorization', this.getToken());
        return this.http.put(this.url + 'inscribirEstudiante/' + `${id}`, data, { headers: headers })

    }

    getCursos(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('authorization', this.getToken());

        return this.http.get(this.url + 'cursos', { headers: headers })
    }

    getCurso(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('authorization', this.getToken());

        return this.http.get(this.url + 'curso/' + `${id}`, { headers: headers })
    }

    crearCurso(curso: any, file?: any): Observable<any> {
        let headers = new HttpHeaders()
        .set('authorization', this.getToken());
        let formData = new FormData();
        formData.append('profesor', curso.profesor)
        formData.append('nombre', curso.nombre)
        formData.append('inicia', curso.inicia)
        formData.append('finaliza', curso.finaliza)
        formData.append('imagen', file);
        formData.append('inscripcion', curso.inscripcion);

        return this.http.post<Curso>(this.url + 'crearCurso', formData, { headers: headers })
    }

    editarCurso(curso: Curso, id: any): Observable<any> {
        let data = JSON.stringify(curso);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('authorization', this.getToken());

        return this.http.put(this.url + 'curso/editar/' + `${id}`, data, { headers: headers })
    }

    eliminarCurso(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('authorization', this.getToken());
        return this.http.delete(this.url + 'curso/delete/' + `${id}`, { headers: headers })
    }


    getToken(): any {
        let result: any = localStorage.getItem('token');
        let token = JSON.parse(result);
        if (!token) {
            return 'No token';
        } else {
            return token;
        }
    }

}
