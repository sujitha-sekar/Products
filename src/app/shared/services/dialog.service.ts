import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openConfirmationDialog(message: string) {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        message: message
      },
      autoFocus: false
    });
    return dialogRef;
  }
}
