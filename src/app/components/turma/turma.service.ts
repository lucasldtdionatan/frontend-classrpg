import { Observable } from 'rxjs';
import { ImageUploadService } from './../../services/image-upload.service';
import { FormGroup } from '@angular/forms';
import { Turma } from './turma.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  turma: Turma;

  constructor(
    private http: HttpClient,
  ) { }

  createTurma(turma: Turma) {
    return this.http.post<any>(`${environment.apiUrl}/turmas/cadastrar`, turma);
  }
}



