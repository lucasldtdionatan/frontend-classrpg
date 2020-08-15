import { AuthenticationService } from './../../services/auth.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sidenavOpen = true;
  
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.sidenavOpen = !this.sidenavOpen;
  }

  onLogout(){
    this.authenticationService.logout();
  }
}
