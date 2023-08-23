import { EventEmitter, Injectable } from '@angular/core';
import { Project } from './models/project';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseQuestion } from './models/response-question';
import { City } from './models/city';

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
        this.setStorageProject(project)   
    }

    loadResponse(responseQuestion:ResponseQuestion){
        this.setResponse(responseQuestion) 
        this.setStorageResponseQuestion(responseQuestion)
        this.setEnvResponse(responseQuestion)      
    }

    setProject(project:Project){
        
        this.selectedProject.next(project);
    }

    setStorageProject(project:Project){
        const newProject = JSON.stringify(project)
        localStorage.setItem('project',newProject)
    }

    setStorageResponseQuestion(response:ResponseQuestion){
        const newProject = JSON.stringify(response)
        localStorage.setItem('response',newProject)
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

    getStorageProject():Project | null{
        const stringProject = localStorage.getItem('project')
        if(stringProject){
            return JSON.parse(stringProject)
        }
        return null        
    }

    getStorageResponseQuestion():ResponseQuestion | null{
        const stringResponseQuestion = localStorage.getItem('response')
        if(stringResponseQuestion){
            return JSON.parse(stringResponseQuestion)
        }
        return null        
    }

    getEnvResponse():ResponseQuestion{
        return this.responseQuestion
    }
  
    removeEnvProject():void{
        let newProject!:Project;
        this.project = newProject;
        localStorage.removeItem('project')
    }

    removeEnvResponseQuestion():void{
        let responseQuestion!:ResponseQuestion;
        this.responseQuestion = responseQuestion;
        localStorage.removeItem('response')
    }

    getProjects(userId:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project/user/"+userId)       
    }

    getResponseById(responseId:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project/response/"+responseId)
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

    checkComplete(id:string){
        this.http.get<any>(this.URL+"/project/check/"+id) .subscribe() 
        return;
    }
    deleteProject(id:string):Observable<any>{        
        return this.http.delete<any>(this.URL+"/project/"+id)   
    }


    getCitiesByState(state: string):Observable<any> {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`;
        
        return this.http.get<City[]>(url)
    }
}
