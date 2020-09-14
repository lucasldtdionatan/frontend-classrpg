
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


import { AuthenticationService } from './services/auth.service';
import { Interceptor } from './interceptors/interceptor.service';

import { LoginComponent } from './components/login/login.component';
import { SidenavTurmaComponent } from './components/turma-home/sidenav-turma/sidenav-turma.component';
import { TurmaAddComponent } from './components/turma-home/turma-home-component/turma-add/turma-add.component';
import { TurmaListComponent } from './components/turma-home/turma-home-component/turma-list/turma-list.component';
import { DialogMassageComponent } from './components/template/dialog-massage/dialog-massage.component';


import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavTurmaComponent,
    TurmaListComponent,
    TurmaAddComponent,
    DialogMassageComponent,
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
    MatTooltipModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
