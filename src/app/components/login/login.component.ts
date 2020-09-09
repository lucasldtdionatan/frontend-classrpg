import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators'

import { registerUser } from '../../models/user.model';
import { AuthenticationService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snack-bar.service'



export class ErrorPasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.parent.hasError('notSame') && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.hasError('notSame') && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isLoginLoading: boolean = false;
  isRegisterLoading: boolean = false;
  error = '';

  user: registerUser = new registerUser();
  registerForm: FormGroup;
  matcher = new ErrorPasswordMatcher();

  // Object form login
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  })

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder
  ) {
    //Object form register
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required]],
      tipoUsuario: this.formBuilder.group({
        id: ['1', [Validators.required]],
      })
    }, { validator: this.checkPasswords })
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoginLoading = true;
    this.authenticationService.login(this.loginForm.value)
      .subscribe(
        data => {
          this.isLoginLoading = false;
          this.router.navigate(['/turmas']);
        },
        error => {
          this.isLoginLoading = false;
          this.snackBarService.openSnackBar('E-mail ou senha inválidos!', 'X', true);
        }
      )

  }

  onRegisterSubimit() {
    this.isRegisterLoading = true;

    this.user.nome = this.registerForm.get("nome").value;
    this.user.senha = this.registerForm.get("senha").value;
    this.user.email = this.registerForm.get("email").value;
    this.user.nickname = this.registerForm.get("nickname").value;
    this.user.tipoUsuario = this.registerForm.get("tipoUsuario").value;

    this.authenticationService.register(this.user)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/turmas']);
        },
        error => {
          this.isRegisterLoading = false;
          this.snackBarService.openSnackBar('E-mail ou nickname já cadastrados', 'X', true);
        }

      )
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.senha.value;
    let confirmPass = group.controls.confirmarSenha.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}

