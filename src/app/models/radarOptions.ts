import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';


export const radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,

    elements:{
    
      line:{
        borderWidth:5
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        boxWidth:15,
        caretSize:15,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            
            return 'Valor: ' + context.formattedValue;
          }
        }
      },
      legend: {
        display: true,
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        min:0,
        max:5,
        
        // step
        grid: {
          color: 'black',
          lineWidth:1.5,      
  
        },
        ticks: {       
          color: 'red',
          stepSize:1,
          display: false, // Remover a exibição das legendas dos números
         
          font:{
            size:18,
  
          }
          
          
  
        },
        pointLabels:{          
          font:{
            size:15,
            weight:"bold",           
                      
          },
        //   callback: function(value) {
        //     if (value.length > 25) {
  
        //       return value.substring(0, 25) + '...'; // Limita a 10 caracteres e adiciona "..." ao final
        //     }
        //     return value;
        //   }
   
        }
      },
   
    },
  
   }
  