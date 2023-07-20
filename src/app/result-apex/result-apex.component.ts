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
  @Input() exportCanvas = false;
  load = false;
  public radarChartType!: ChartType;
    public radarChartOptions: ChartConfiguration['options'];

    ngOnChanges(changes: SimpleChanges): void {
      this.load=false;
      this.radarChartType = 'radar';
      this.radarChartOptions= radarChartOptions;
       
      this.data = this.radarChartData;
      this.load=true;

      if(this.exportCanvas)
        this.export();
    }

    export(){
      const chartCanvas = document.getElementById('chart') as HTMLCanvasElement;
      const canvas = document.createElement('canvas'); // Crie um canvas temporário
      if(!canvas) return;
      canvas.width = chartCanvas.width;
      canvas.height = chartCanvas.height;
      const ctx = canvas.getContext('2d');
      if(!ctx) return;
      // Preencha o canvas com um fundo branco
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      // Renderize o gráfico no canvas temporário
      ctx.drawImage(chartCanvas, 0, 0);
    
      // Converta o canvas para uma imagem PNG
      canvas.toBlob((blob) => {
    
        if(!blob) return;
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = 'chart.png';
        link.click();
    
        // Clean up the URL object
        URL.revokeObjectURL(url);
      });
    }
    
  
}
