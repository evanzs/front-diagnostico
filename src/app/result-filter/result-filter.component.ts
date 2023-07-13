import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartData, ChartConfiguration, ChartType } from 'chart.js';
import { Project } from '../models/project';
import { radarChartOptions } from '../models/radarOptions';
import { ProjectService } from '../project.service';
import { ResultService } from '../result/result.service';

@Component({
  selector: 'app-result-filter',
  templateUrl: './result-filter.component.html',
  styleUrls: ['./result-filter.component.css']
})
export class ResultFilterComponent implements OnInit {
  project!:Project;
  constructor(private _resultService:ResultService,
    private _projectservice:ProjectService,
    private _router:Router,
    private readonly _route:ActivatedRoute
    ){ 

  }

  radarChartData!: ChartData<'radar'>;


  labels!:string[];
  principlesNames!:string[];
  result!:any;

  selectedPrinciple = "Congruência";
  loading = false;
  ngOnInit(): void {
        this.project = this._projectservice.getEnvProject();
        this._resultService.getResultByProjectId(this.project?._id).subscribe((res) =>{
          this.result = res;
          this.transformData(res)
          this.radarChartData = this.buildData();
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
  this.radarChartData.datasets = []
  this.loading = true;
    this.selectedPrinciple = item;
    
    if(this.result.length > 0){  
       this.transformData(this.result)
       this.radarChartData = this.buildData();
    }

  this.loading =false
}
}
