import { TurmaList } from './../turma-home/turma-home.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  constructor(
    private http: HttpClient,
  ) { }

  createPersonagem(turma: any) {
    return this.http.post<any>(`${environment.apiUrl}/personagens/cadastrar`, turma);
  }

  getUsuarioAndTurmaById(id: number){
    return this.http.get<any>(`${environment.apiUrl}/personagens/usuario/turma/${id}`);
  }
}
