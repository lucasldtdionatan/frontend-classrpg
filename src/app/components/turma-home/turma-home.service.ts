import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Turma, TurmaList } from './turma-home.model';


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



