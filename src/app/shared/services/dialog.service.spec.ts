import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [DialogService,
        { provide: MatDialog, useValue: dialogSpy }]
    });
    service = TestBed.inject(DialogService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call openDialogBox', () => {
    const message = 'hei'
    service.openConfirmationDialog(message);
    expect(service.openConfirmationDialog).toBeDefined()
  });

});
