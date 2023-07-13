import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartConfiguration, ChartType } from 'chart.js';
import { radarChartOptions } from '../models/radarOptions';

@Component({
  selector: 'app-result-apex',
  templateUrl: './result-apex.component.html',
  styleUrls: ['./result-apex.component.css']
})
export class ResultApexComponent implements OnChanges {

  @Input() radarChartData!: ChartData<'radar'>;
  data!:ChartData<'radar'>;
  load = false;
  public radarChartType!: ChartType;
    public radarChartOptions: ChartConfiguration['options'];

    ngOnChanges(changes: SimpleChanges): void {
      this.load=false;
      this.radarChartType = 'radar';
      this.radarChartOptions= radarChartOptions;
       
      this.data = this.radarChartData;

      this.load=true;
    }
  
}
