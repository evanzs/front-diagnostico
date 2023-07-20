import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Principle } from 'src/app/models/principle';
export interface PeriodicElement {
  name: string;
  rate: number;
  ask: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {rate: 1, name: 'Hydrogen', ask: 1.0079, symbol: 'H'},
  {rate: 2, name: 'Helium', ask: 4.0026, symbol: 'He'},
  {rate: 3, name: 'Lithium', ask: 6.941, symbol: 'Li'},
  {rate: 4, name: 'Beryllium', ask: 9.0122, symbol: 'Be'},
  {rate: 5, name: 'Boron', ask: 10.811, symbol: 'B'},
  {rate: 6, name: 'Carbon', ask: 12.0107, symbol: 'C'},
  {rate: 7, name: 'Nitrogen', ask: 14.0067, symbol: 'N'},
  {rate: 8, name: 'Oxygen', ask: 15.9994, symbol: 'O'},
  {rate: 9, name: 'Fluorine', ask: 18.9984, symbol: 'F'},
  {rate: 10, name: 'Neon', ask: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-table-responser',
  templateUrl: './table-responser.component.html',
  styleUrls: ['./table-responser.component.css']
})
export class TableResponserComponent implements OnChanges{

  displayedColumns: string[] = ['guidelineName', 'ask', 'rate'];
  dataSource!:any;

  @Input() data!:Principle;
  
  ngOnChanges(changes: SimpleChanges): void {
      this.buildData();
  }

  buildData():void{
    if(!this.data)
        return ;
    
    let result = this.data.guidelines.map((guideline) =>{

    const newData =guideline.questions.map((question)=>{
        return {
          ask:question.ask,
          rate:question.rate,
          tag:question.tag,
          guidelineName:guideline.name,          
        }
      })
    return newData
    })
    this.dataSource =result.flat()
 

  }

}


