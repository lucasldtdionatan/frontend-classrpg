import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { ImageUploadService } from './../../services/image-upload.service';
import { FormGroup } from '@angular/forms';
import { Turma, TurmaList } from './turma.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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

  getTurmas(): Observable<TurmaList[]> {
    return this.http.get<TurmaList[]>(`${environment.apiUrl}/turmas/usuario`);
  }

  getQtdTurmas() {
    return this.http.get<any>(`${environment.apiUrl}/turmas/usuario/qtd`);
  }

  deleteTurma(id: string) {
    return this.http.delete(`${environment.apiUrl}/turmas/${id}`);
  }
}



