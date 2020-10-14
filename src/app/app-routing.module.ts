import { AtividadeDistribuicaoXPComponent } from './components/turma/atividades/atividade-distribuicao-xp/atividade-distribuicao-xp.component';
import { AtividadeEditComponent } from './components/turma/atividades/atividade-edit/atividade-edit.component';
import { AtividadeAddComponent } from './components/turma/atividades/atividade-add/atividade-add.component';
import { AtividadeListComponent } from './components/turma/atividades/atividade-list/atividade-list.component';
import { NivelEditComponent } from './components/turma/nivel/nivel-edit/nivel-edit.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TurmaAddComponent } from './components/turma-home/turma-home-component/turma-add/turma-add.component';
import { SidenavTurmaHomeComponent } from './components/turma-home/sidenav-turma-home/sidenav-turma-home.component';
import { TurmaListComponent } from './components/turma-home/turma-home-component/turma-list/turma-list.component';
import { NivelListComponent } from './components/turma/nivel/nivel-list/nivel-list.component';
import { AlunosListComponent } from './components/turma/alunos/alunos-list/alunos-list.component';
import { SidenavTurmaComponent } from './components/turma/sidenav-turma/sidenav-turma.component';
import { TurmaSearchComponent } from './components/turma-home/turma-home-component/turma-search/turma-search.component';
import { NivelAddComponent } from './components/turma/nivel/nivel-add/nivel-add.component';

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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'alunos',
        canActivate: [AuthGuard],
        component: AlunosListComponent
      },
      {
        path: 'atividades',
        canActivate: [AuthGuard],
        component: AtividadeListComponent
      },
      {
        path: 'criaratividade',
        canActivate: [AuthGuard],
        component: AtividadeAddComponent
      },
      {
        path: 'editaratividade/:id',
        canActivate: [AuthGuard],
        component: AtividadeEditComponent,

      },
      {
        path: 'distribuirxp/:id',
        canActivate: [AuthGuard],
        component: AtividadeDistribuicaoXPComponent,

      },
      {
        path: 'niveis',
        canActivate: [AuthGuard],
        component: NivelListComponent,
      },
      {
        path: 'criarnivel',
        canActivate: [AuthGuard],
        component: NivelAddComponent
      },
      {
        path: 'editarnivel/:id',
        canActivate: [AuthGuard],
        component: NivelEditComponent
      }
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
