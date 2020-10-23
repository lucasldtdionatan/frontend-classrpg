import { PersonagemAtividade } from './personagem.model';
import { Personagem } from 'src/app/components/personagem/personagem.model';
import { TurmaList } from './../turma-home/turma-home.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  personagensTurma: Personagem[] = [];
  emitQtdPersonagemByTurma = new EventEmitter<any>();
  qtd_personagens: number;

  constructor(
    private http: HttpClient,
  ) { }

  createPersonagem(turma: any) {
    return this.http.post<any>(`${environment.apiUrl}/personagens/cadastrar`, turma);
  }

  getQtdPersonagemByTurma(id_turma: string) {
    this.http.get<any>(`${environment.apiUrl}/personagens/qtd/turma/${id_turma}`).pipe(take(1)).subscribe(
      resp => {
        this.qtd_personagens = resp.quantidade;
        this.emitQtdPersonagemByTurma.emit(this.qtd_personagens);
      }
    )
  }

  getUsuarioAndTurmaById(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/personagens/usuario/turma/${id}`);
  }

  getPersonagensByTurma(id: string) {
    return this.http.get<Personagem[]>(`${environment.apiUrl}/personagens/turma/${id}?orderBy=id`);
  }
  // getPersonagensByTurma(id: string) {
  //   return this.http.get<Personagem[]>(`${environment.apiUrl}/personagens/turma/${id}?orderBy=id`)
  //     .pipe(take(1))
  //     .subscribe(
  //       resp => {
  //         this.personagensTurma = resp;
  //         console.log(this.personagensTurma)
  //       }
  //     )
  // }

  getPersonagemByTurmaAndAtividade(idTurma, idAtividade: string) {
    return this.http.get<PersonagemAtividade[]>(`${environment.apiUrl}/personagens/turma/${idTurma}/atividade/${idAtividade}`);
  }

  deletePersonagem(id_personagem: string) {
    return this.http.delete(`${environment.apiUrl}/personagens/${id_personagem}`);
  }

  returnPersonagensTurma() {
    return this.personagensTurma;
  }

}
