
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';;
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

import { AuthenticationService } from './services/auth.service';
import { Interceptor } from './interceptors/interceptor.service';

import { LoginComponent } from './components/login/login.component';
import { SidenavTurmaHomeComponent } from './components/turma-home/sidenav-turma-home/sidenav-turma-home.component';
import { TurmaAddComponent } from './components/turma-home/turma-home-component/turma-add/turma-add.component';
import { TurmaListComponent } from './components/turma-home/turma-home-component/turma-list/turma-list.component';
import { DialogMassageComponent } from './components/template/dialog-massage/dialog-massage.component';


import { AuthGuard } from './guards/auth-guard';
import { TurmaSearchComponent } from './components/turma-home/turma-home-component/turma-search/turma-search.component';
import { SidenavTurmaComponent } from './components/turma/sidenav-turma/sidenav-turma.component';
import { AlunosListComponent } from './components/turma/alunos/alunos-list/alunos-list.component';
import { NivelListComponent } from './components/turma/nivel/nivel-list/nivel-list.component';
import { NivelAddComponent } from './components/turma/nivel/nivel-add/nivel-add.component';
import { NivelEditComponent } from './components/turma/nivel/nivel-edit/nivel-edit.component';
import { AtividadeListComponent } from './components/turma/atividades/atividade-list/atividade-list.component';
import { AtividadeAddComponent } from './components/turma/atividades/atividade-add/atividade-add.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { AtividadeEditComponent } from './components/turma/atividades/atividade-edit/atividade-edit.component';
import { AtividadeDistribuicaoXPComponent } from './components/turma/atividades/atividade-distribuicao-xp/atividade-distribuicao-xp.component';
import { RecompensaListComponent } from './components/turma/recompensa/recompensa-list/recompensa-list.component';
import { RecompensaAddComponent } from './components/turma/recompensa/recompensa-add/recompensa-add.component';
import { RecompensaEditComponent } from './components/turma/recompensa/recompensa-edit/recompensa-edit.component';
import { DialogDataComponent } from './components/template/dialog-data/dialog-data.component';
import { ConfiguracaoTurmaComponent } from './components/turma/configuracao-turma/configuracao-turma.component';
import { ColherRecompensaComponent } from './components/template/colher-recompensa/colher-recompensa.component';
import { RankingComponent } from './components/turma/ranking/ranking/ranking.component';
import { DetalhePersonagemComponent } from './components/template/detalhe-personagem/detalhe-personagem.component';
import { ConfiguracaoUsuarioComponent } from './components/configuracao-usuario/configuracao-usuario.component';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { DetalheAtividadeComponent } from './components/template/detalhe-atividade/detalhe-atividade.component';
import { PasswordComponent } from './components/login/password/password.component';
import { AlterpasswordComponent } from './components/login/alterpassword/alterpassword.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavTurmaHomeComponent,
    TurmaListComponent,
    TurmaAddComponent,
    DialogMassageComponent,
    TurmaSearchComponent,
    SidenavTurmaComponent,
    AlunosListComponent,
    NivelListComponent,
    NivelAddComponent,
    NivelEditComponent,
    AtividadeListComponent,
    AtividadeAddComponent,
    AtividadeEditComponent,
    AtividadeDistribuicaoXPComponent,
    RecompensaListComponent,
    RecompensaAddComponent,
    RecompensaEditComponent,
    DialogDataComponent,
    ConfiguracaoTurmaComponent,
    ColherRecompensaComponent,
    RankingComponent,
    DetalhePersonagemComponent,
    ConfiguracaoUsuarioComponent,
    AlterarSenhaComponent,
    DetalheAtividadeComponent,
    PasswordComponent,
    AlterpasswordComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },


    AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
