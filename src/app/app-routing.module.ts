import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TurmaAddComponent } from './components/turma-home/turma-home-component/turma-add/turma-add.component';
import { SidenavTurmaComponent } from './components/turma-home/sidenav-turma/sidenav-turma.component';
import { TurmaListComponent } from './components/turma-home/turma-home-component/turma-list/turma-list.component';


import { AuthGuard } from './guards/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: SidenavTurmaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'turmas',
        canActivate: [AuthGuard],
        component: TurmaListComponent
      },
      {
        path: 'novaturma',
        canActivate: [AuthGuard],
        component: TurmaAddComponent
      },
      { path: '', redirectTo: '/turmas', pathMatch: 'full' },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
