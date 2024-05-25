import { Component } from '@angular/core';
import { InputValidDirective } from './input-valid.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
@Component({
  template: ` <input appInputValid type="text" [(ngModel)]="value">`
})
class TestComponent {
  value!: string;
}
describe('InputValidDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InputValidDirective, TestComponent]
    })
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should create an instance', () => {
    const directive = new InputValidDirective();
    expect(directive).toBeTruthy();
  });


  it('should prevent "0" key when caret is at start', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = ' ';
    inputElement.setSelectionRange(0, 0);
    const event = new KeyboardEvent('keydown', { key: ' ' });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.value).toBeUndefined();
  });

});
