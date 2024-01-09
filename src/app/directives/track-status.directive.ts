import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rfTrackStatus]'
})
export class TrackStatusDirective {

  constructor(public renderer: Renderer2,
              public elementRef: ElementRef) { }
  
  @HostListener("statusEvent", ["$event"])
  toggleClass(event: string){

    //TODO - Inserir essa logica, o evento esta funcionando!
  
  }
  
  

}
