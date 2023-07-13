import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import { radarChartOptions } from '../models/radarOptions';
import { ResultService } from './result.service';
import { ProjectService } from '../project.service';
import { Project } from '../models/project';
import { Router, ActivatedRoute } from '@angular/router';
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
    private readonly _route:ActivatedRoute
    ){ 

  }

  radarChartData!: ChartData<'radar'>;

  public radarChartOptions: ChartConfiguration['options'] = radarChartOptions;
  public radarChartType: ChartType = 'radar';
  labels!:string[];
  principlesNames!:string[];
  result!:any;

  selectedPrinciple = "Congruência";
  loading = false;
  ngOnInit(): void {

    this._route.params 
    .subscribe({
      next:(params) =>{          
        this.selectedPrinciple = params['name']
        this.project = this._projectservice.getEnvProject();
        this._resultService.getResultByProjectId(this.project?._id).subscribe((res) =>{
          this.result = res;
          this.transformData(res)
          this.radarChartData = this.buildData();
        })
      }
    })
  }


  transformData(result:any):void{
    const resultCreator = result.find((r:any) => r.creator === true)

    if(!resultCreator)
        return;
    
    const {results} = resultCreator;

    if(!results)
        return;
    
    let  data = results.filter((r:any) => r.principle === this.selectedPrinciple);

    let principle = results.map(({ principle }:any) => principle)
    const labels = data.map(({ guideline }:any) => guideline);    
    const dataset = data.map(({ rate }:any) => {
      if(!rate)
          return 0
     return rate
    });   
    if(labels.length> 0 && dataset.length> 0 ){

      this.setLabels(labels);
      this.setDataset(dataset)
  
    }         

    if(principle.length > 0){
        principle = [... new Set(principle)]
       this.principlesNames =     principle ;
    }
    
  

  }
  setLabels(labels:string[])   {

    this.labels=labels;
    this.radarChartLabels =labels
  }
  setDataset(dataset:number[]){
   
    this.dataset = dataset
    
  }
 // Radar
radarChartLabels: string[] =[]
dataset:Array<number | null>= []

buildData(){
  return {
    labels: this.radarChartLabels,
    
    datasets: [
      { data: this.dataset,
      label:'CONGRUÊNCIA'},
    ],
  
    
  };
}

changeSelect(item:string){


    this.selectedPrinciple = item;
    
    if(this.result.length > 0){  
       this.transformData(this.result)
    }

  
}
}
 




