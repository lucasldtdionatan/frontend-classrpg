import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

import { AuthenticationService } from './../../../services/auth.service';
import { TurmaService } from './../turma-home.service';

import { User } from './../../../models/user.model';


@Component({
  selector: 'app-sidenav-turma',
  templateUrl: './sidenav-turma.component.html',
  styleUrls: ['./sidenav-turma.component.css']
})
export class SidenavTurmaComponent implements OnInit {

  sidenavOpen = true;
  isTeacher: boolean = false;

  user: User;
  screenWidth: number = screen.width;

  resizeObservable$: Observable<Event>

  qtdTurmas: number = 0;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private turmaService: TurmaService
  ) {
  }


  ngOnInit(): void {

    //abaixo eh lancado um evento para obter a largura da página para poder ajustar o sidenav conforme a tela
    this.resizeObservable$ = fromEvent(window, 'resize');
    window.addEventListener('resize', (event: UIEvent) => {
      const w = event.target as Window;
      this.screenWidth = w.innerWidth;
    })

    this.user = this.authenticationService.currentUserValue;
    if (this.user.tipoUsuario.id === 2) { //check if is teacher
      this.isTeacher = true;
    }

    this.turmaService.emitQtdTurmas.subscribe(
      resp => {
        this.qtdTurmas = resp;
      }
    )
  }

  toggleSideBar() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
