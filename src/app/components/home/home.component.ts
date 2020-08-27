import { User } from './../../models/user.model';
import { AuthenticationService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sidenavOpen = true;
  isTeacher: boolean = false;
  user: User;
  screenWidth: number = screen.width;

  resizeObservable$: Observable<Event>

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }


  ngOnInit(): void {

    //abaixo eh lancado um evento para obter a largura da página para poder ajustar o sidenav conforme a tela
    this.resizeObservable$ = fromEvent(window, 'resize');
    window.addEventListener('resize', (event: UIEvent) => {
      const w = event.target as Window;
      this.screenWidth = w.innerWidth;
    })
    // this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
    //   this.screenWidth = screen.width;
    //   console.log(' olo' + this.screenWidth);
    //   this.screenWidth = evt.target.innerWidth;
    //   console.log(this.screenWidth);
    // })


    this.user = this.authenticationService.currentUserValue;
    if (this.user.tipoUsuario.id === 2) { //check if is teacher
      this.isTeacher = true;
    }
  }

  toggleSideBar() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
