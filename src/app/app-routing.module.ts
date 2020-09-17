import { SidenavTurmaComponent } from './components/turma/sidenav-turma/sidenav-turma.component';
import { TurmaSearchComponent } from './components/turma-home/turma-home-component/turma-search/turma-search.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TurmaAddComponent } from './components/turma-home/turma-home-component/turma-add/turma-add.component';
import { SidenavTurmaHomeComponent } from './components/turma-home/sidenav-turma-home/sidenav-turma-home.component';
import { TurmaListComponent } from './components/turma-home/turma-home-component/turma-list/turma-list.component';


import { AuthGuard } from './guards/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: SidenavTurmaHomeComponent,
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
      {
        path: 'buscarturma',
        canActivate: [AuthGuard],
        component: TurmaSearchComponent
      },
      { path: '', redirectTo: '/turmas', pathMatch: 'full' },
    ]
  },
  {
    path: 'turma/:id',
    component: SidenavTurmaComponent,
    canActivate: [AuthGuard]
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
