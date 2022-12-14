import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlumnosGenero]'
})
export class AlumnosGeneroDirective {

  @Input('appAlumnosGenero') colorFondo!: string

  constructor(
    private elemento: ElementRef,
    private renderer: Renderer2
  ) { 

  }

  ngOnInit(): void {
    //this.alumnoEdad = this.alumnoEdad.toLocaleLowerCase();
    this.renderer
    .setStyle(this.elemento.nativeElement, 'background-color', 
    this.colorFondo === 'Masculino' || this.colorFondo === 'masculino' ? 'yellow': 'pink');
    this.renderer
    .setStyle(this.elemento.nativeElement, 'color', 
    this.colorFondo === 'Masculino' || this.colorFondo === 'masculino' ? 'red': 'blue');
  }

}
