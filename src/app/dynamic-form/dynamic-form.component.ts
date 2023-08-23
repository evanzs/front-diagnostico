import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project } from '../models/project';
import { Question } from '../models/question';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Guideline } from '../models/guideline';
import { tagsApp } from '../models/tags-map';
import { TAG_OPTIONS } from '../models/tagOptions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit,OnChanges {
  @Input() project!: Project; // Passar o projeto como entrada para o componente
  @Input() indexPrinciple = -1
  @Output() nextPrinciple = new EventEmitter<number>();
  dynamicForm!: FormGroup;
  panelOpenState = false;
  disabledTagFilter = false;

  selectedTags = ['Produção','Processamento','Distribuição']
  radioItems = ['0','1','2','3','4','5','Não sei']
  tagFilter = ['']

  tagOptions = TAG_OPTIONS;

  constructor(private formBuilder: FormBuilder,
    private _projectService:ProjectService,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.indexPrinciple = 0;
    this.buildDynamicForm();
    this.setTagFilter() 
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
    for (const questionId in formData) {
      if (formData.hasOwnProperty(questionId)) {
        const answer = formData[questionId];
      
        // Atualizar a taxa da pergunta correspondente no objeto 'project'
        this.project.principles[this.indexPrinciple].guidelines.forEach((guideline) => {
          if(guideline._id === questionId)
          guideline.sugestion= answer;

          const question = guideline.questions.find((q) => q._id === questionId);
          if (question) {
            question.rate = answer;
          }
        });
      }
    }
    this.project.tagFilter = this.tagFilter;
    this._projectService.updateCreatorResponse(this.project._id,this.project).subscribe({
      next:(project)=>{
       

        this._snackBar.open("Questionário Salvo!","Fechar",{duration:6000})
      }
    })
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
    this.tagFilter = this.selectedTags;
    this.panelOpenState =true;
  }

  setTagFilter(){

    if(this.project.tagFilter){
      this.tagFilter = this.project?.tagFilter[0].length ? this.project.tagFilter :   this.selectedTags
    }
    else{
      this.tagFilter  = this.selectedTags
    }
    this.selectedTags = this.tagFilter
  }

  validateTag(tag:string[]):boolean{
    const tagFiltred = tagsApp.find( t => t?.tag[0]?.toLowerCase() === tag[0]?.toLowerCase())?.filters ?? [] 

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

