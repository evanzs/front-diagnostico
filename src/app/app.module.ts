import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsComponent } from './questions/questions.component';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatInputModule} from '@angular/material/input'; 
@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgbModule,
    NgbAccordionModule,
    MatExpansionModule,
    MatInputModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
