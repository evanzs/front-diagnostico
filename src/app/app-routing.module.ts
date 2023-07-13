import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { MenuComponent } from './menu/menu.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard.';
import { ResultComponent } from './result/result.component';
import { ResponsesComponent } from './responses/responses.component';
import { ResponseQuestionsComponent } from './response-questions/response-questions.component';
import { ChartsChartsjsComponent } from './charts-chartsjs/charts-chartsjs.component';
import { ResultFilterComponent } from './result-filter/result-filter.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'create-question', component: CreateQuestionComponent,canActivate:[AuthGuard] },
  { path: 'questions/:id', component: QuestionsComponent,canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent },  
  { path: 'result/:name', component: ResultComponent,canActivate:[AuthGuard] },  
  { path: 'result-filter', component: ResultFilterComponent,canActivate:[AuthGuard] },  

  { path: 'responses', component: ResponsesComponent,canActivate:[AuthGuard] },
  { path: 'response/questions/:id', component: ResponseQuestionsComponent,canActivate:[AuthGuard] }    
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}