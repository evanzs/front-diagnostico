import { ResponseQuestion } from 'src/app/models/response-question';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ResultService } from './result.service';
import { ProjectService } from '../project.service';
import { Project } from '../models/project';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Principle } from '../models/principle';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  project!:Project;
  constructor(private _resultService:ResultService,
    private _projectservice:ProjectService,
    private _router:Router,
    private readonly _route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:ResponseQuestion

    ){ 

  }

  datasource!:Principle;
  principleNames = [''];
  principles!:Principle[];
  ngOnInit(): void {   
    this.principles = this.data.principles;
   
  }

  setPrinciplesNames(principles:Principle[]):void{
    const names = principles.map(p => p.name)
    this.principleNames = names
  }
}

 




