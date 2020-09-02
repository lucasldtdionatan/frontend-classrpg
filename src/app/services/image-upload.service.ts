import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient, private router: Router) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/text'
  });

  uploadImage(file: FormData) {
    return this.http.post(`${environment.apiUrl}/imagens`, file)
  }
}
