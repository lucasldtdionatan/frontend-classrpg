import { TurmaListComponent } from './components/turma/turma-list/turma-list.component';
import { TurmaAddComponent } from './components/turma/turma-add/turma-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
