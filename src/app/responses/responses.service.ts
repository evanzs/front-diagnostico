import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class ResponsesService {

    private readonly URL = environment.apiUrl

    constructor(private http: HttpClient) { }

    getResponsesByProjectId(projectId:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project/"+projectId+"/response")
    }

    delete(responseId:string):Observable<any>{
        return this.http.delete<any>(this.URL+"/project/response/"+responseId)
    }


  }