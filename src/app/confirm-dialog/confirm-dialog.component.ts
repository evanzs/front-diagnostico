import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { GenericDialog } from '../models/interfaces/generic-dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit{
  constructor(private readonly _projectService:ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: GenericDialog
    ){}


  dialogStatus ={ title:"Confirmação",text:"Deseja deletar esse projeto?",btnVisible:true,btnText:"Confirmar"}
  ngOnInit(): void {
    this.buildDialog()
  }
  
  buildDialog(){
    const {title,text,btnText,btnVisible} = this.data;
    if(title && text){
      this.dialogStatus.title = title;
      this.dialogStatus.text = text;
      this.dialogStatus.btnText = btnText;
      this.dialogStatus.btnVisible = btnVisible;
    }
  }
}
