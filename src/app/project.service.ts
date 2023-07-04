import { EventEmitter, Injectable } from '@angular/core';
import { Project } from './models/project';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectService {

private readonly URL = environment.apiUrl

private project!:Project;
private selectedProject  = new Subject<Project>();

constructor(private http: HttpClient) { }


    loadProject(project:Project){
        this.setProject(project) 
        this.setEnvProject(project)      
    } 


    createNewProject(data:any){
        
        this.createProject(data).subscribe({
            next: (res) =>{
                this.selectedProject =res;
            },
            error: () =>{
                console.log("projeto n encontrato")
            }

        })


    }
    setProject(project:Project){
        
        this.selectedProject.next(project);
    }
    getSelectedProject():Observable<Project> {
        return this.selectedProject.asObservable();      
    }
  
    getProjects():Observable<any>{
        return this.http.get<any>(this.URL+"/project/")       
    }
    createProject(data:any):Observable<any>{
        return this.http.post<any>(this.URL+"/project",data)       
    }

    setEnvProject(project:Project):void{
        this.project = project
    }

    getEnvProject():Project{
        return this.project
    }
}
