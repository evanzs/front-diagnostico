import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserApp } from '../models/userApp';

@Component({
  selector: 'app-key-dailog',
  templateUrl: './key-dailog.component.html',
  styleUrls: ['./key-dailog.component.css']
})
export class KeyDailogComponent implements OnInit {
  meetupForm!: FormGroup;
  userApp!:UserApp
  ngOnInit(): void {
    this.meetupForm = new FormGroup({
      key: new FormControl('',Validators.required),
      email: new FormControl(''),
     
    });

  }
}
