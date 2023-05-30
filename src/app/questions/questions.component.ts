import { Component } from '@angular/core';
import { Section } from '../models/section';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})


export class QuestionsComponent{
  constructor(){}
  panelOpenState = false;
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
