import { style } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ApexDataLabels,
  ChartComponent,
  ApexStroke,
  ApexPlotOptions,
  ApexYAxis,
  ApexMarkers
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  tooltip: any;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-charts-chartsjs',
  templateUrl: './charts-chartsjs.component.html',
  styleUrls: ['./charts-chartsjs.component.css']
})
export class ChartsChartsjsComponent implements OnChanges{
  @ViewChild("chart") chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;

 @Input() data:Array<number | null> =[];
 @Input() labels:Array<string> = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      series: [
        {
          name: "Series 1",
          data: this.data
        }
      ],
      chart: {
        width:'100%',
        height: 500,
        type: "radar"
      },
      dataLabels: {
        enabled: true

      },
      plotOptions: {
        radar: {
          size: 225,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"]
            }
          }
        }
      },
      title: {
        text: "Radar with Polygon Fill"
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: ["#FF4560"],
        strokeWidth: 1
      },
      tooltip: {
        y: {
          formatter: function(val: any) {
            return val;
          }
        }
      },
      xaxis: {
       categories: this.labels,
       min:0,
       max:5,
       floating:false,
       labels:{
        formatter: function (value: string) {
          if (value.length > 50) {
            const index = value.lastIndexOf(' ', 50);
            return value.substring(0, index) + '...';
          }
          return value;
        },
        maxHeight: 12,
        style: {
          colors: [],
          fontSize: '18px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
      },
      
       }

      },
      yaxis: {
        tickAmount: 6,
        min: 0,
        max: 5,
        forceNiceScale: true

      }
    };
  }




  
}
