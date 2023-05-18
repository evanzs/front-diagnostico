import { Component } from '@angular/core';
interface Question {
  id: string;
  text: string;
  rating: number;
  description:string;


}

interface Section {
  id: string;
  name: string;
  description:string;
  questions: Question[];
  endRate:number;
}
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})


export class QuestionsComponent{
  constructor(){}
  panelOpenState = false;
  sections: Section[] = [{
    id: "1",
    name: "Section 1",
    description:"section about nothing",
    endRate:10,
    questions: [
      {
        id: "1",
        text: "How would you rate the customer service?",
        rating: 4,
        description:"would rate",

      },
      {
        id: "2",
        text: "What is your opinion about the product?",
        rating: 3,
        description:"would rate",

      },
    ],
  }]
}
