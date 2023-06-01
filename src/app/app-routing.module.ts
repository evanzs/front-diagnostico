import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { MenuComponent } from './menu/menu.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'create-question', component: CreateQuestionComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
  ];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}