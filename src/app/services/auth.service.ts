import { SnackBarService } from './snack-bar.service';
import { Interceptor, InterceptorSkipHeader } from './../interceptors/interceptor.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User, loginUser, registerUser } from './../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  private token: BehaviorSubject<any>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient, private router: Router, private snackBarService: SnackBarService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.token = new BehaviorSubject<any>(localStorage.getItem('Authorization'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public get getToken() {
    return this.token;
  }

  login(user: loginUser) {
    // return this.http.post<any>(`${environment.apiUrl}/login`, user)
    //   .pipe(map(user => {
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUserSubject.next(user);
    //     console.log(user)
    //     console.log(user.headers.get('Authorization'));
    //     return user;
    //   }))
    return this.http.post<any>(`${environment.apiUrl}/login`, user, { observe: 'response' })
      .pipe(map(
        resp => {
          this.currentUserSubject.next(resp.body);
          // this.token = resp.headers.get('Authorization');
          localStorage.setItem('Authorization', resp.headers.get('Authorization'));
          localStorage.setItem('currentUser', JSON.stringify(resp.body));
        }));
  }

  register(user: registerUser) {
    // const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

    return this.http.post<any>(`${environment.apiUrl}/usuarios/registrar`, user);

  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Authorization');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isTeacher() {
    if (this.currentUserSubject.value.tipoUsuario.id === 2) {
      return true;
    } else {
      return false;
    }
  }
}