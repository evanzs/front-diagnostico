import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { Section } from './models/section';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor( public appService:AppService){

  }
  ngOnInit(): void {
    console.log("inicial")
    this.emitirValor();
  }

  emitirValor(){
    console.log("emitiu",this.sections)
  this.appService.emitValor(this.sections)
  }
  sections: Section[] = [{

    name: "Section 1",
    description:"section about nothing",
    endRate:10,
    questions: [
      {
    
        text: "How would you rate the customer service?",
        rating: 4,
        description:"would rate",

      },
      {
   
        text: "What is your opinion about the product?",
        rating: 3,
        description:"would rate",

      },
    ],
  }]

}
