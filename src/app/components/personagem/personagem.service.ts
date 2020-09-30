import { Personagem } from 'src/app/components/personagem/personagem.model';
import { TurmaList } from './../turma-home/turma-home.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  personagensTurma: Personagem[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  createPersonagem(turma: any) {
    return this.http.post<any>(`${environment.apiUrl}/personagens/cadastrar`, turma);
  }

  getUsuarioAndTurmaById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/personagens/usuario/turma/${id}`);
  }

  getPersonagensByTurma(id: string) {
    return this.http.get<Personagem[]>(`${environment.apiUrl}/personagens/turma/${id}?orderBy=id`)
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

  returnPersonagensTurma() {
    return this.personagensTurma;
  }
}
