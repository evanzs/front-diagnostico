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

    setProject(project:Project){
        
        this.selectedProject.next(project);
    }
    getSelectedProject():Observable<Project> {
        return this.selectedProject.asObservable();      
    }
  
    getProjects(userId:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project/user/"+userId)       
    }
    createProject(userId:string,data:any):Observable<any>{
        return this.http.post<any>(this.URL+"/project/"+userId,data)       
    }

    updateProject(projectId:string,data:any):Observable<any>{
        return this.http.patch<any>(this.URL+"/project/"+projectId,data)       
    }

    setEnvProject(project:Project):void{
        this.project = project
    }

    getEnvProject():Project{
        return this.project
    }

    deleteProject(id:string):Observable<any>{        
        return this.http.delete<any>(this.URL+"/project/"+id)   
    }
}
