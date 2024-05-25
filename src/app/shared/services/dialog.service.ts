import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }
  /**
   * Opens a confirmation dialog with a specified message.
   * @param message The message to be displayed in the confirmation dialog.
   * @returns A reference to the dialog instance, which can be used to subscribe to the dialog's close event.
   */
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
