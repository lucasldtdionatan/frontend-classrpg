import { SnackBarService } from './../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { AuthenticationService } from './../../services/auth.service';
import { Location } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


export class ErrorPasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.parent.hasError('notSame') && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.hasError('notSame') && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  isLoading: boolean = false;
  formPassword: FormGroup;
  matcher = new ErrorPasswordMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private Location: Location,
    private authenticationService: AuthenticationService,
    private snackBarService: SnackBarService
  ) {
    this.formPassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.checkPasswords })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    let password_update = {
      senha: this.formPassword.value.password,
      confirmarSenha: this.formPassword.value.confirmPassword
    }

    this.authenticationService.updatePassword(password_update).pipe(take(1)).subscribe(
      resp => {
        this.snackBarService.openSnackBar('Senha alterada com sucesso!', 'X', false);
        this.isLoading = false;
      },
      error => {
        this.snackBarService.openSnackBar('', 'X', true);
        this.isLoading = false;
      }
    )
  }

  onCancel() {
    this.Location.back();
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
