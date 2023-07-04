import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import { radarChartOptions } from '../models/radarOptions';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
 // Radar
 public radarChartOptions: ChartConfiguration['options'] = radarChartOptions;

public radarChartLabels: string[] = 
['Conteúdo e fonte alimentar culturalmente apropriados',
'Maximização da utilização de alimentos',
'Respeito aos direitos',
'Respeito aos limites biofísicos',
'Sinergia ecológica',
'Tecnologias apropriadas a escala, cultura e economia'];


public radarChartData: ChartData<'radar'> = {
  labels: this.radarChartLabels,
  
  datasets: [
    { data: [1.74025974,
      1.448148148,
      0.3555555556,
      1.144671202,
      1.536111111,
      1.766666667],
    label:'CONGRUÊNCIA'},
  ],

  
};
public radarChartType: ChartType = 'radar';

// events
public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
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
 




