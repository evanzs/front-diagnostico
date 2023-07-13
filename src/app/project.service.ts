import { EventEmitter, Injectable } from '@angular/core';
import { Project } from './models/project';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseQuestion } from './models/response-question';

@Injectable()
export class ProjectService {

private readonly URL = environment.apiUrl

private project!:Project;
private responseQuestion!:ResponseQuestion;
private selectedProject  = new Subject<Project>();
private selectedResponse  = new Subject<ResponseQuestion>();
constructor(private http: HttpClient) { }


    loadProject(project:Project){
        this.setProject(project) 
        this.setEnvProject(project)      
    }

    loadResponse(responseQuestion:ResponseQuestion){
        this.setResponse(responseQuestion) 
        this.setEnvResponse(responseQuestion)      
    }

    setProject(project:Project){
        
        this.selectedProject.next(project);
    }

    setResponse(responseQuestion:ResponseQuestion){
        
        this.selectedResponse.next(responseQuestion);
    }
    getSelectedProject():Observable<Project> {
        return this.selectedProject.asObservable();      
    }
    getSelectedResponse():Observable<ResponseQuestion> {
        return this.selectedResponse.asObservable();      
    }

    setEnvProject(project:Project):void{
        this.project = project
    }

    setEnvResponse(responseQuestion:ResponseQuestion):void{
        this.responseQuestion = responseQuestion
    }


    getEnvProject():Project{
        return this.project
    }

    getEnvResponse():ResponseQuestion{
        return this.responseQuestion
    }
  
    getProjects(userId:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project/user/"+userId)       
    }

    getResponseById(responseId:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project/response/"+responseId)
    }


    getResponsesByProjectId(responseId:string):Observable<ResponseQuestion[]>{
        return this.http.get<any>(this.URL+"/project/"+responseId+"/response")
    }


    getProjectById(projectId:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project/"+projectId)
    }
    createProject(userId:string,data:any):Observable<any>{
        return this.http.post<any>(this.URL+"/project/"+userId,data)       
    }

    updateProject(projectId:string,data:any):Observable<any>{
        return this.http.patch<any>(this.URL+"/project/"+projectId,data)       
    }

    updateCreatorResponse(projectId:string,data:any):Observable<any>{
        return this.http.patch<any>(this.URL+"/project/"+projectId+"/creator",data)       
    }

    createResponse(projectId:string,data:any):Observable<any>{
        return this.http.post<any>(this.URL+"/project/"+projectId+"/response",data)       
    }
    
    updateResponse(responseId:string,data:any):Observable<any>{
        return this.http.patch<any>(this.URL+"/project/response/"+responseId,data)       
    }


    deleteProject(id:string):Observable<any>{        
        return this.http.delete<any>(this.URL+"/project/"+id)   
    }
}
