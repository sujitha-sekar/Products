import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputValid]'
})
export class InputValidDirective {

  constructor() { }
  @HostListener("keydown", ["$event"])
  onKeydown(element: any) {
    if (element.target.selectionStart === 0 && element.key === " ") {
      return false;
    }
  }
}
