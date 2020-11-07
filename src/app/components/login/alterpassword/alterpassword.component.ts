import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { PasswordService } from './../passsword.service';
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
  selector: 'app-alterpassword',
  templateUrl: './alterpassword.component.html',
  styleUrls: ['./alterpassword.component.css']
})
export class AlterpasswordComponent implements OnInit {

  form: FormGroup;
  matcher = new ErrorPasswordMatcher();
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required]],
    }, { validator: this.checkPasswords })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;

    let password = {
      token: this.form.controls.codigo.value,
      senha: this.form.controls.senha.value,
      confirmarSenha: this.form.controls.confirmarSenha.value
    }

    this.passwordService.alterPasswordByToken(password).pipe(take(1)).subscribe(
      resp => {
        this.isLoading = false;
        this.snackBarService.openSnackBar("Senha alterada com sucesso!", "X", false);
        this.router.navigate(['/login']);
      },
      error => {
        this.isLoading = false;
      }
    )


  }
  onCancel() {
    this.router.navigate(['/login']);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.senha.value;
    let confirmPass = group.controls.confirmarSenha.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
