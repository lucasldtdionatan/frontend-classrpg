import { environment } from './../../../../environments/environment';
import { Recompensa } from './recompensa.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecompensaService {

  constructor(private http: HttpClient,) {
  }

  getRecompensaByTurma(id_turma: string) {
    return this.http.get<Recompensa[]>(`${environment.apiUrl}/recompensas/turma/${id_turma}`);
  }

  getById(id_recompensa: string) {
    return this.http.get<Recompensa>(`${environment.apiUrl}/recompensas/${id_recompensa}`);
  }

  update(id_recompensa, recompensa: Recompensa) {
    return this.http.put(`${environment.apiUrl}/recompensas/${id_recompensa}`, recompensa);
  }

  createRecompensa(recompensa: Recompensa) {
    return this.http.post(`${environment.apiUrl}/recompensas/cadastrar`, recompensa);
  }

  delete(id_recompensa: string) {
    return this.http.delete(`${environment.apiUrl}/recompensas/${id_recompensa}`);
  }
}
