import { EventEmitter, Injectable } from '@angular/core';
import { Project } from './models/project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {

private readonly URL = 'http://localhost:3000';
emitEventoProject = new EventEmitter<Project>();
emitEventoEnableMenuNav = new EventEmitter<boolean>();
constructor(private http: HttpClient) { }


    loadProject(id:string){
        this.getProject(id).subscribe({
            next:(res)=>{
                this.emitEventoProject.emit(res)
               this.emitEventoEnableMenuNav.emit(true)
            },
            error:()=>{
                this.emitEventoEnableMenuNav.emit(true)
                console.log("projeto n encontrato")
            }
        })
    } 

    createNewProject(data:any){
        
        this.createProject(data).subscribe({
            next: (res) =>{
                this.emitEventoProject.emit(res)
            },
            error: () =>{
                console.log("projeto n encontrato")
            }

        })


    }
  
    getProject(id:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project")       
    }
  
    createProject(data:any):Observable<any>{
        return this.http.post<any>(this.URL+"/project",data)       
    }


}
