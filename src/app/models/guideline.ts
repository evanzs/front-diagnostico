import { Question } from "./question"

export interface Guideline {

    name:string,
    _id:string,
    description:string
    questions:Array<Question>
  }