import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  forgetPassword(email: string) {
    return this.http.get(`${environment.apiUrl}/usuarios/esquecisenha/${email}`);
  }

  alterPasswordByToken(token: any) {
    return this.http.post(`${environment.apiUrl}/usuarios/esquecisenha/token`, token);
  }
}
