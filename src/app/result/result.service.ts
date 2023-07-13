import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class ResultService {

    private readonly URL = environment.apiUrl

    constructor(private http: HttpClient) { }

    getResultByProjectId(projectId:string):Observable<any>{
        return this.http.get<any>(this.URL+"/project/"+projectId+"/result")       
    }


  }