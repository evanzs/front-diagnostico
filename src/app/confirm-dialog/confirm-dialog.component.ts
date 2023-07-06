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

  title = "Confirmação";
  text = "Deseja deletar esse projeto?"

  ngOnInit(): void {
    this.buildDialog()
  }
  
  buildDialog(){
    const {title,text} = this.data;
    if(title && text){
      this.title = title;
      this.text = text;
    }
  }
}
