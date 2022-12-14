import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-curso',
  templateUrl: './eliminar-curso.component.html',
  styleUrls: ['./eliminar-curso.component.css']
})
export class EliminarCursoComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<EliminarCursoComponent>

  ) { }

  ngOnInit(): void {
  }

  eliminarCurso(param: any){
    this.matDialogRef.close(param);
  }

}
