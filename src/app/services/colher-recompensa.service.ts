import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recompensa } from '../components/turma/recompensa/recompensa.model';

@Injectable({
  providedIn: 'root'
})
export class ColherRecompensaService {

  constructor(private http: HttpClient) { }

  save(recompensa: any) {
    return this.http.post(`${environment.apiUrl}/recompensas/colher/cadastrar`, recompensa);
  }

  getRecompensasSelecionadas(id_personagem: number) {
    return this.http.get<Recompensa[]>(`${environment.apiUrl}/recompensas/colher/personagem/${id_personagem}`);
  }

  getRecompensasByPersonagem(id_personagem) {
    return this.http.get<Recompensa[]>(`${environment.apiUrl}/recompensas/colher/personagem/${id_personagem}`);
  }
}
