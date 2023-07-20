import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project } from '../models/project';
import { Question } from '../models/question';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit,OnChanges {
  @Input() project!: Project; // Passar o projeto como entrada para o componente
  @Input() indexPrinciple = 0
  @Output() nextPrinciple = new EventEmitter<number>();
  dynamicForm!: FormGroup;
  panelOpenState = false;

  radioItems = ['0','1','2','3','4','5','Não sei']
  constructor(private formBuilder: FormBuilder,
    private _projectService:ProjectService,
    private _snackBar: MatSnackBar) {}

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
      this.dynamicForm.addControl(guideline._id, this.formBuilder.control(guideline.sugestion));

    });
  }
  saveForm() {

    const formData = this.dynamicForm.value;
    console.log("teste",formData)
    for (const questionId in formData) {
      if (formData.hasOwnProperty(questionId)) {
        const answer = formData[questionId];
      
        // Atualizar a taxa da pergunta correspondente no objeto 'project'
        this.project.principles[0].guidelines.forEach((guideline) => {
          if(guideline._id === questionId)
          guideline.sugestion= answer;

          const question = guideline.questions.find((q) => q._id === questionId);
          if (question) {
            question.rate = answer;
          }
        });
      }
    }
    this._projectService.updateCreatorResponse(this.project._id,this.project).subscribe({
      next:(project)=>{
        this._snackBar.open("Questionário Salvo!","Fechar",{duration:60000000})
      }
    })
  }

  eventoNextPrinciple(){
    this.nextPrinciple.emit(this.indexPrinciple+1)
  }

  eventoPreviousPrinciple(){
    if(this.indexPrinciple === 0){
      return;
    }
    this.nextPrinciple.emit(this.indexPrinciple -1)
  }

}
