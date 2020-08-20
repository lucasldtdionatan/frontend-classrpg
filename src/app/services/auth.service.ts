import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User, loginUser } from './../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: loginUser) {
    return this.http.post<any>(`${environment.apiUrl}/login`, user)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}





// login(usuario: Usuario) {

  //   // return this.http.post<{access_token: string}>(this.basaUrl, usuario).pipe(tap(res => {
  //   //   localStorage.setItem('access_token', res.access_token)
  //   // }))

  //   return this.http.post(this.basaUrl, usuario, { observe: 'response' }).subscribe(data => {
  //     this.teste();
  //   });

  //   // if (usuario.email == 'teste.com.br' && usuario.password == '123') {

  //   //   this.userAuth = true;
  //   //   this.router.navigate(['/']);

  //   // } else {

  //   //   this.userAuth = false;

  //   // }
  // }
  // teste() {
    //   let titulo = 'teste';
    //   let imagem = '';

    //   this.http.post('http://localhost:8080/api/turmas/cadastrar', { titulo, imagem }).subscribe(res => {
    //     console.log(res)
    //   })
    // }
    // authenticatedUser() {
    //   return this.userAuth;
    // }