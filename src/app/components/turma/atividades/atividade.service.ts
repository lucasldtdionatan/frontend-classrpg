import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Atividade } from './atividade.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(private http: HttpClient) { }

  createAtividade(atividade: Atividade) {
    return this.http.post<any>(`${environment.apiUrl}/atividades/cadastrar`, atividade);
  }

  getAtividades(id: string) {
    return this.http.get<Atividade[]>(`${environment.apiUrl}/atividades/turma/${id}`);
  }

  getAtividadeById(id: string) {
    return this.http.get<Atividade>(`${environment.apiUrl}/atividades/${id}`);
  }

  deteleAtividade(id: string) {
    return this.http.delete(`${environment.apiUrl}/atividades/${id}`);
  }
}
