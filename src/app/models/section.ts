import { Question } from "./question";

export interface Section {

    name: string;
    description:string;
    questions: Question[];
    endRate:number;
  }