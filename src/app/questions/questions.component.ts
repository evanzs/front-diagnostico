import { Component, OnInit } from '@angular/core';
import { Section } from '../models/section';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})


export class QuestionsComponent implements OnInit{

  teste:any = []
  constructor(private readonly _authService:AuthService){}
  ngOnInit(): void {
    this.teste = this._authService.getUser()
  }
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
