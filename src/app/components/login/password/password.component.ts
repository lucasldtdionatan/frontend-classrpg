import { Router } from '@angular/router';
import { SnackBarService } from './../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordService } from './../passsword.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  isLoading: boolean = false;

  constructor(
    private passwordService: PasswordService,
    private snackBarService: SnackBarService,
    private router: Router,
    public dialogRef: MatDialogRef<PasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  sendEmail() {
    this.isLoading = true;
    console.log(this.emailForm.controls.email.value);
    this.passwordService.forgetPassword(this.emailForm.controls.email.value).pipe(take(1)).subscribe(
      resp => {
        this.isLoading = false;
        this.snackBarService.openSnackBar("Código enviado para o e-mail informado", "X", false);
        this.router.navigate(['/password']);
        this.dialogRef.close();
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  navigateToPassword() {
    this.router.navigate(['/password']);
    this.dialogRef.close();
  }

}
