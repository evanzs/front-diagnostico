import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Guideline } from 'src/app/models/guideline';
import { Question } from 'src/app/models/question';
import { ResponseQuestion } from 'src/app/models/response-question';
import { tagsApp } from 'src/app/models/tags-map';
import { ProjectService } from 'src/app/project.service';


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
  disabledTagFilter = false;
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
    private _snackBar: MatSnackBar
   
    ) { }

  
  tagFilter = ['']
  ngOnInit() {
    this.indexPrinciple = 0
    this.verifyEdit()
    this.buildDynamicForm();
    this.setTagFilter()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['indexPrinciple'] && !changes['indexPrinciple'].firstChange) {
      this.buildDynamicForm();
    }
  }

  verifyEdit():void{
    if(this.responseQuestion._id){
      this.disabledTagFilter = true;
    }
    
  }

  setTagFilter(){
    this.tagFilter = this.responseQuestion.tagFilter[0].length ? this.responseQuestion.tagFilter :   this.selectedTags
    this.selectedTags = this.tagFilter
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
        this.responseQuestion.principles[this.indexPrinciple].guidelines.forEach((guideline) => {
          if(guideline._id === questionId)
              guideline.sugestion= answer;
          const question = guideline.questions.find((q) => q._id === questionId);

          if (question) {

              question.rate = answer;
              
          }
        });
      }
    }
    this.disabledTagFilter = true;
    this.responseQuestion.tagFilter = this.selectedTags;


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
    const data = {
      title: "Deseja aplicar filtro nesse projeto?",
      text:"O filtro aplicado será definitivo se for salvo.",
      btnText:"Confirmar",
      btnVisible:true
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.tagFilter = this.selectedTags;
      }
      return;
    });

  }  

  validateTag(tag:string[]):boolean{
    const tagFiltred = tagsApp.find( t => t.tag[0] === tag[0])?.filters ?? []
 
    if(tag.length <= 0 )
      return true;
    if(!this.tagFilter.includes(tagFiltred[0]))
        return false;


    return true;
  }

  validateGuideline(guideline:Guideline):boolean{
    let result = false;
    const tags = this.getTagsByGuideline(guideline)

    tags.map( (t) => {
      if(this.validateTag([t])){
        result = true;
      }
    })
    return result;
  }

  getTagsByGuideline(guideline:Guideline):string[] {     
      const tags = [];  
      for (const question of guideline.questions) {
        tags.push(...question.tags);
      }   
    return tags;
  }

}


