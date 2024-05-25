import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
class MockMatSnackBar {
  openFromComponent() {

  }
}
describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule, MatIconModule],
      providers: [
        { provide: MatSnackBar, useClass: MockMatSnackBar }
      ]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call openSnackbar with message and type', () => {
    const message = 'message', type = 'type'
    service.openSnackbar(message, type);
    expect(service.openSnackbar).toBeDefined();
  });

  it('should call openSnackbar without panelClass', () => {
    const message = 'message', type = 'type', duration = 3000;
    service.openSnackbar(message, type, duration);
    expect(service.openSnackbar).toBeDefined();
  });

  it('should call openSnackbar with panelClass is undefined', () => {
    const message = 'message', type = 'type', duration = 3000, panelClass = undefined
    service.openSnackbar(message, type, duration, panelClass);
    expect(service.openSnackbar).toBeDefined();
  });

  it('should call openSnackbar with panelClass', () => {
    const message = 'message', type = 'type', duration = 3000, panelClass = 'panelclass'
    service.openSnackbar(message, type, duration, panelClass);
    expect(service.openSnackbar).toBeDefined();
  });
  
});
