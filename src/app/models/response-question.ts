import { Principle } from "./principle";
import { Question } from "./question";

export interface ResponseQuestion {

    _id?:string;
    projectId:string;
    completed?:boolean,
    principles:Array<Principle>
    createdAt?:Date,
    UpdateAt?:Date,
    email?:string;
    tagFilter:string[]
  }