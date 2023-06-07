import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { MenuComponent } from './menu/menu.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard.';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
      { path: 'create-question', component: CreateQuestionComponent,canActivate:[AuthGuard] },
      { path: 'questions', component: QuestionsComponent,canActivate:[AuthGuard] },
      { path: 'register', component: RegisterComponent,canActivate:[AuthGuard] }
    ]
  }
  ];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}