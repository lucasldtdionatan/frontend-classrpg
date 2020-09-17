import { Personagem } from './../../personagem/personagem.model';
import { PersonagemService } from './../../personagem/personagem.service';
import { TurmaService } from './../../turma-home/turma-home.service';
import { TurmaList } from './../../turma-home/turma-home.model';
import { User } from './../../../models/user.model';
import { AuthenticationService } from './../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-turma',
  templateUrl: './sidenav-turma.component.html',
  styleUrls: ['./sidenav-turma.component.css']
})
export class SidenavTurmaComponent implements OnInit {
  resizeObservable$: Observable<Event>
  screenWidth: number = screen.width;
  sidenavOpen = true;

  isTeacher: boolean = false;

  user: User;
  personagem: Personagem;
  turma: TurmaList = { id: null, titulo: null, imagem: null, codigoAcesso: null, quantidade: null }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private turmaHomeService: TurmaService,
    private personagemService: PersonagemService,
  ) { }

  ngOnInit(): void {
    this.personagem = {
      descricao: null,
      experiencia: null,
      id: null,
      imagemAvatar: null,
      nivel: {
        id: null,
        experienciaMinima: null,
        experienciaMaxima: null,
        nome: null,
        nivel: null,
        turma: this.turma,
      },
      turma: this.turma,
      quantidade: null,
      usuario: this.user,
    }


    this.resizeObservable$ = fromEvent(window, 'resize');
    window.addEventListener('resize', (event: UIEvent) => {
      const w = event.target as Window;
      this.screenWidth = w.innerWidth;
    })

    const id = this.route.snapshot.paramMap.get('id')
    this.turmaHomeService.getTurmaById(id).pipe(take(1)).subscribe(
      resp => {
        this.turma = resp;
        this.personagemService.getUsuarioAndTurmaById(this.turma.id).pipe(take(1)).subscribe(
          resp => {
            this.personagem = resp;
            console.log(this.personagem)
          }
        )
      }
    );


    this.isTeacher = this.authService.isTeacher();
    this.user = this.authService.currentUserValue;

  }

  toggleSideBar() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  onBack() {
    this.router.navigate(['turmas']);
  }

}
