import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

/**
 * Represents details of a snackbar.
 */
interface SnackbarDetails {
  type: string;
  icon: string;
  panelClass: string
}
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  /**
   * An array of snackbar details for different types of notifications.
   */
  details: SnackbarDetails[] = [
    { type: 'Success', icon: 'check', panelClass: 'snackbar-success' },
    { type: 'Error', icon: 'error', panelClass: 'snackbar-error' },
    { type: 'Warning', icon: 'warning', panelClass: 'snackbar-warning' },
    { type: 'Info', icon: 'priority_high', panelClass: 'snackbar-info' },
    { type: 'Default', icon: 'data_usage', panelClass: 'snackbar-default' }

  ]

  constructor(private matSnackbar: MatSnackBar) { }
  /**
   * Opens a snackbar with a specified message and type.
   * @param message The message to be displayed in the snackbar.
   * @param type The type of the snackbar.
   * @param duration The duration the snackbar should be visible (optional).
   * @param panelClass Additional CSS class to style the snackbar (optional).
   * @returns A reference to the snackbar instance.
   */
  openSnackbar(message: string, type: string, duration?: number, panelClass?: string) {
    const property = this.details.find(x => x.type === type);
    const snackbarRef = this.matSnackbar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        icon: property?.icon
      },
      duration: duration ? duration : 3000,
      panelClass: panelClass ? panelClass : property?.panelClass
    });
    return snackbarRef;
  }
}
