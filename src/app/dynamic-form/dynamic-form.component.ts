import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project } from '../models/project';
import { Question } from '../models/question';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() project!: Project; // Passar o projeto como entrada para o componente

  dynamicForm!: FormGroup;
  panelOpenState = false;

  radioItems = ['0','1','2','3','4','5','Não sei']
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
     
    this.dynamicForm = this.formBuilder.group({});
    this.project.principles[0].guidelines.forEach((guideline: any) => {
      guideline.questions.forEach((question: Question) => {
        this.dynamicForm.addControl(question._id, this.formBuilder.control(question.rate));
      });
    });
  }

  saveForm() {

    const formData = this.dynamicForm.value;
    for (const questionId in formData) {
      if (formData.hasOwnProperty(questionId)) {
        const answer = formData[questionId];
        
        // Atualizar a taxa da pergunta correspondente no objeto 'project'
        this.project.principles[0].guidelines.forEach((guideline) => {
          const question = guideline.questions.find((q) => q._id === questionId);
          if (question) {
            question.rate = answer;
          }
        });
      }
    }
    console.log(this.project.principles[0])
  }

  teste(item:any){
    console.log(item)
  }
}
