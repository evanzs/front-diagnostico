import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { Question } from 'src/app/models/question';
import { ResponseQuestion } from 'src/app/models/response-question';
import { ProjectService } from 'src/app/project.service';

@Component({
  selector: 'app-dynamic-response',
  templateUrl: './dynamic-response.component.html',
  styleUrls: ['./dynamic-response.component.css']
})
export class DynamicResponseComponent implements OnInit,OnChanges{


  @Input() responseQuestion!: ResponseQuestion; // Passar o projeto como entrada para o componente
  @Input() indexPrinciple = 0
 
  dynamicForm!: FormGroup;
  panelOpenState = false;

  confirmData = {
    title:"Chave para continuar respondendo.",
    text:"",
    btnVisible:false,
    btnText:""
}
  radioItems = ['0','1','2','3','4','5','Não sei']
  constructor(private formBuilder: FormBuilder,
    private _projectService:ProjectService,
    public dialog: MatDialog,
    ) {}

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
    const guidelines = this.responseQuestion.principles[this.indexPrinciple].guidelines;
    guidelines.forEach((guideline: any) => {
      guideline.questions.forEach((question: Question) => {
        this.dynamicForm.addControl(question._id, this.formBuilder.control(question.rate));
      });
    });
  }
  saveForm() {
    console.log(this.responseQuestion)
    const formData = this.dynamicForm.value;
    for (const questionId in formData) {
      if (formData.hasOwnProperty(questionId)) {
        const answer = formData[questionId];
        
        // Atualizar a taxa da pergunta correspondente no objeto 'project'
        this.responseQuestion.principles[0].guidelines.forEach((guideline) => {
          const question = guideline.questions.find((q) => q._id === questionId);
          if (question) {
            question.rate = answer;
          }
        });
      }
    }

    console.log(this.responseQuestion)
      if(this.responseQuestion._id)
        return this.update(this.responseQuestion._id);
    return this.create()
  }


  create(){

    this._projectService.createResponse(this.responseQuestion.projectId,this.responseQuestion).subscribe(
      {next:(res)=>{
      this.responseQuestion = res
        this.openDialog(res?._id)
      }

    });

  }

  update(id:string){
    this._projectService.updateResponse(id,this.responseQuestion).subscribe(
      {next:(res)=>{
        this.openDialog(res?._id)
      }
    }
    )
  }

  openDialog(text:string){
    const data = this.confirmData;
    data.text = text
    this.dialog.open(ConfirmDialogComponent,{data})
  }
}
