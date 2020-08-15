import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators'
import { Router } from '@angular/router';

import { loginUser } from '../../models/user.model';
import { AuthenticationService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: loginUser = new loginUser();
  error = '';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authenticationService.login(this.user)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
        }
      )
  }

}
