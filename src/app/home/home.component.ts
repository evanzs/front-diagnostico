import { Component, OnInit } from '@angular/core';
import { UserApp } from '../models/userApp';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  
  user!:UserApp;
  panelOpenState = false;
  projects = [{ id:'i9129383',name:"Projeto 1", description:"descricao projeto 1"},
  { id:'29398123',name:"Projeto 2", description:"descricao projeto 2"}]


  constructor(private readonly _authService:AuthService){}
  ngOnInit(): void {
    this._authService.emitirUserApp.subscribe(
      user => this.user = user
    )
  }

  createNewProject(): void {
    console.log('Criar novo projeto');
    // Lógica para criar um novo projeto
  }

  loadProjects(id:string): void {
    console.log('Carregar novo projeto',id);
    // Lógica para carregar um novo projeto
  }
}
