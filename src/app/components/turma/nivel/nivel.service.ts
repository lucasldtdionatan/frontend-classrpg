import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Nivel } from './nivel.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(private http: HttpClient,) { }

  getByTuma(id: string) {
    return this.http.get<Nivel[]>(`${environment.apiUrl}/configuracaoNivel/turma/${id}`);
  }

  getByIdNivel(id: string) {
    return this.http.get<Nivel>(`${environment.apiUrl}/configuracaoNivel/${id}`);
  }

  createNivel(nivel: Nivel) {
    return this.http.post(`${environment.apiUrl}/configuracaoNivel/cadastrar`, nivel);
  }

  updateNivel(nivel: Nivel) {
    return this.http.put(`${environment.apiUrl}/configuracaoNivel/${nivel.id}`, nivel)
  }

  deleteNivel(id: string) {
    return this.http.delete(`${environment.apiUrl}/configuracaoNivel/${id}`)
  }
}
