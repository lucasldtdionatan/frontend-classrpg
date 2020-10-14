import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConclusaoAtividade } from './../../../models/conclusao-atividade';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConclusaoAtividadeService {

  constructor(private http: HttpClient) { }

  save(conclusaoAtividade: ConclusaoAtividade) {
    return this.http.post(`${environment.apiUrl}/conclusao/cadastrar`, conclusaoAtividade);
  }

  update(id, experiencia: number) {
    let conclusaoExperiencia = {
      experiencia: experiencia
    }
    return this.http.put(`${environment.apiUrl}/conclusao/${id}`, conclusaoExperiencia);
  }
}
