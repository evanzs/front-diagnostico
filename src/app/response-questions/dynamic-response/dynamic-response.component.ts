import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Project } from 'src/app/models/project';
import { Question } from 'src/app/models/question';
import { ResponseQuestion } from 'src/app/models/response-question';
import { ProjectService } from 'src/app/project.service';
import {COMMA, E, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-dynamic-response',
  templateUrl: './dynamic-response.component.html',
  styleUrls: ['./dynamic-response.component.css']
})
export class DynamicResponseComponent implements OnInit,OnChanges{


  @Input() responseQuestion!: ResponseQuestion; // Passar o projeto como entrada para o componente
  @Input() indexPrinciple = -1
  @Output() nextPrinciple = new EventEmitter<number>();
  dynamicForm!: FormGroup;
  panelOpenState = false;

  confirmData = {
    title:"Chave para continuar respondendo.",
    text:"",
    btnVisible:false,
    btnText:""
}
  radioItems = ['0','1','2','3','4','5','Não sei']
  selectedTags = ['Produção','Processamento','Distruibuição']
  constructor(private formBuilder: FormBuilder,
    private _projectService:ProjectService,
    public dialog: MatDialog,
   
    ) { }


  ngOnInit() {
    this.indexPrinciple = 0
    this.buildDynamicForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
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
      this.dynamicForm.addControl(guideline._id, this.formBuilder.control(guideline.sugestion));

    });
  }
  saveForm() {

    const formData = this.dynamicForm.value;
    for (const questionId in formData) {
      if (formData.hasOwnProperty(questionId)) {
        const answer = formData[questionId];

        // Atualizar a taxa da pergunta correspondente no objeto 'project'
        this.responseQuestion.principles[0].guidelines.forEach((guideline) => {
          if(guideline._id === questionId)
          guideline.sugestion= answer;
          const question = guideline.questions.find((q) => q._id === questionId);
          if (question) {
            question.rate = answer;
          }
        });
      }
    }

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

  eventoNextPrinciple(){
    this.nextPrinciple.emit(this.indexPrinciple+1)
  }

  eventoPreviousPrinciple(){

    this.nextPrinciple.emit(this.indexPrinciple -1)
  }

  changeTags(event:any){
    this.selectedTags = event.value
  }  

  aplicarFiltro(){
   
  }

}


