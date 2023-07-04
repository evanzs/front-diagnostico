import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsComponent } from './questions/questions.component';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component'; 
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button'; 
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list';
import { CreateQuestionComponent } from './create-question/create-question.component';
import {MatMenuModule} from '@angular/material/menu';
import { RegisterComponent } from './register/register.component'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { ProjectService } from './project.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard.';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { NgChartsModule } from 'ng2-charts';
import { ResultComponent } from './result/result.component';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatTableModule} from '@angular/material/table';
import { ResponsesComponent } from './responses/responses.component';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    LoginComponent,
    MenuComponent,
    CreateQuestionComponent,
    RegisterComponent,
    HomeComponent,
    DynamicFormComponent,
    ResultComponent,
    ResponsesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgbModule,
    NgbAccordionModule,
    MatExpansionModule,
    MatInputModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    MatGridListModule,
    NgChartsModule ,   
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatSnackBarModule
      
  ],
  providers: [        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,ProjectService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
