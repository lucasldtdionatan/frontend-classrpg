import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, isError: boolean = false) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: isError? ['msg-error'] : ['msg-success']
    })
  }
}
