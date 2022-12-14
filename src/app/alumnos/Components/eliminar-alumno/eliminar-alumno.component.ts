import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-eliminar-alumno',
  templateUrl: './eliminar-alumno.component.html',
  styleUrls: ['./eliminar-alumno.component.css']
})
export class EliminarAlumnoComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<EliminarAlumnoComponent>

  ) { }

  ngOnInit(): void {
  }

  eliminarAlumno(param: string): void{
    if(param === 'Eliminar'){
      this.matDialogRef.close(param);
    }

  }


}
