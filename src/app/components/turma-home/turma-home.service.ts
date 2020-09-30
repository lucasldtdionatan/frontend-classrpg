import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Turma, TurmaList } from './turma-home.model';


@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  emitTurmas = new EventEmitter<TurmaList[]>()
  emitQtdTurmas = new EventEmitter<number>()
  turmas: TurmaList[];

  idTurma: any;

  constructor(
    private http: HttpClient,
  ) { }

  createTurma(turma: Turma) {
    return this.http.post<any>(`${environment.apiUrl}/turmas/cadastrar`, turma);
  }

  getTurmas() {
    this.http.get<TurmaList[]>(`${environment.apiUrl}/turmas/usuario`).pipe(take(1)).subscribe(
      resp => {
        this.turmas = resp;
        this.emitTurmas.emit(this.turmas);
        this.emitQtdTurmas.emit(this.turmas.length);
      },
      error => {
        this.turmas = [];
        this.emitTurmas.emit(this.turmas);
        this.emitQtdTurmas.emit(this.turmas.length);
      }
    );
  }

  getTurmaById(id: string) {
    this.idTurma = id;
    return this.http.get<TurmaList>(`${environment.apiUrl}/turmas/${id}`);;
  }
  returnIdTurma() {
    return this.idTurma;
  }

  getTurmaByToken(codigo: string) {
    return this.http.get<TurmaList>(`${environment.apiUrl}/turmas/codigo/${codigo}`);
  }

  getQtdTurmas() {
    return this.http.get<any>(`${environment.apiUrl}/turmas/usuario/qtd`);
  }

  deleteTurma(id: string) {
    return this.http.delete(`${environment.apiUrl}/turmas/${id}`);
  }
}



