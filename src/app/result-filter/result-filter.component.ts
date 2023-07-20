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

  exportCanvas = false;
  labels!:string[];
  principlesNames!:string[];
  result!:any;

  selectedPrinciple = "Congruência";
  loading = false;

      // Radar
      radarChartLabels: string[] =[]
      datasetResponser:Array<number | null>= []
      datasetCreator:Array<number | null>= []

  
  ngOnInit(): void {
        this.project = this._projectservice.getEnvProject();
        if(this.project){
          this._projectservice.loadProject(this.project)
        }
        this._resultService.getResultByProjectId(this.project?._id).subscribe((res) =>{
          this.result = res;
          this.transformDataCreator(res)
          this.transformDataResponses(res)
          this.radarChartData = this.buildData()
        })     

        this.exportCanvas = false;

  }


  transformDataCreator(result:any):void{
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
      this.setDatasetCreator(dataset)
  
    }         

    if(principle.length > 0){
        principle = [... new Set(principle)]
       this.principlesNames =     principle ;
    } 

  }


  transformDataResponses(result:any):void{
    const resultCreator = result.find((r:any) => r.creator === false)

    if(!resultCreator)
        return;
    
    const {results} = resultCreator;

    if(!results)
        return;
    
    let  data = results.filter((r:any) => r.principle === this.selectedPrinciple);
    const dataset = data.map(({ rate }:any) => {
      if(!rate)
          return 0
     return rate
    });   
    if(dataset.length> 0 ){
  
      this.setDatasetResponser(dataset)  
    }  
  }

  setLabels(labels:string[])   {
    this.labels=labels;
    this.radarChartLabels =labels
  }

  setDatasetCreator(dataset:number[]){    
    this.datasetCreator = dataset;
  }

  setDatasetResponser(dataset:number[]){    
    this.datasetResponser = dataset;
  }

  setExport(){
    this.exportCanvas = true;
  }

buildData(){
  return {
    labels: this.radarChartLabels,
    
    datasets: [
      { data: this.datasetCreator,
      label:'Criador',
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    },
    { data: this.datasetResponser,
      label:'Participantes',
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    },
    ],
  
    
  };
}

changeSelect(item:string){


    this.selectedPrinciple = item;
    
    if(this.result.length > 0){ 
       this.transformDataCreator(this.result)
       this.transformDataResponses(this.result)
       this.radarChartData = this.buildData();
    }

  
}
}
