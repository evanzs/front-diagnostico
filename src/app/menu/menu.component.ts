import { OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from './../auth.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UserApp } from '../models/userApp';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseQuestion } from '../models/response-question';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  @Input() user!:UserApp;

  constructor(
    private readonly _projectService:ProjectService,
    private readonly _loginService:LoginService,
    private readonly _authService:AuthService,
    private readonly _router:Router,
    private readonly _route:ActivatedRoute
    ){
    
  }

  project$!:Observable<Project>;
  response$!:Observable<ResponseQuestion>;

  isMenuOpen= false;
  enableMenuBar = false;
  enableMenuNav = false;
  enableMenuResponser = false;


  ngOnInit(): void {  
     this._loginService.emitEventoEnableMenuBar.subscribe( (enableMenuBar) => {this.enableMenuBar = enableMenuBar})
     this._loginService.emitEventoEnableMenuNav.subscribe( (enableMenuNav) => {this.enableMenuNav = enableMenuNav})
     this._loginService.emitEventoenableMenuResponser.subscribe( (enableMenuResponser) => {this.enableMenuResponser = enableMenuResponser})
     this.project$ = this._projectService.getSelectedProject();
     this.response$ = this._projectService.getSelectedResponse();
     this.user = this._authService.getUser();
   
    }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openPrinciple(id:string){
    this._router.navigate(['/questions',id])
  }

  openResponserQuestion(id:string){
    this._router.navigate(['/response/questions',id])
  }

  openPrincipleResponse(id:string){
    this._router.navigate(['/responses',id])
  }

  openResult(name:string){
    this._router.navigate(['/result',name])
  }

  onClose(){
    this._authService.removeToken();
    this._authService.removeUser();
    this._projectService.removeEnvProject();
    this._loginService.disableMenuNav();
    this._loginService.disableMenuBar();
    this._loginService.disableMenuResponser();


    this._router.navigate(['/login'])

  }
}
