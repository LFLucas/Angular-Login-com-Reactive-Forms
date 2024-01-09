import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rfTrackStatus]'
})

export class TrackStatusDirective {

  constructor(public renderer: Renderer2,
              public elementRef: ElementRef) {  }
            
  @HostListener("statusEvent", ["$event"])
  toggleClass(event: string){   
    let timeoutID

    if(event ==='success') this.renderer.removeClass(this.elementRef.nativeElement, 'error')
    else this.renderer.removeClass(this.elementRef.nativeElement, 'success') 

    this.renderer.addClass(this.elementRef.nativeElement, event)

    clearTimeout(timeoutID)
    timeoutID = setTimeout(() =>this.renderer.removeClass(this.elementRef.nativeElement, event) , 10000)
  }

  

}