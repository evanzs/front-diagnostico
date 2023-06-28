import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project } from '../models/project';
import { Question } from '../models/question';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit,OnChanges {
  @Input() project!: Project; // Passar o projeto como entrada para o componente
  @Input() indexPrinciple = 0
  dynamicForm!: FormGroup;
  panelOpenState = false;

  radioItems = ['0','1','2','3','4','5','Não sei']
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildDynamicForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['indexPrinciple'] && !changes['indexPrinciple'].firstChange) {
      this.buildDynamicForm();
    }
  }

  buildDynamicForm() {
    this.dynamicForm = this.formBuilder.group({});
    const guidelines = this.project.principles[this.indexPrinciple].guidelines;
    guidelines.forEach((guideline: any) => {
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
    console.log(this.project.principles[this.indexPrinciple])
  }

  teste(item:any){
    console.log(item)
  }
}
