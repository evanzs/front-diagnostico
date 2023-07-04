import { Question } from "./question"
import { ResponseQuestion } from "./response-question"

export interface Guideline {

    name:string,
    _id:string,
    description:string
    questions:Array<Question>
    responses:Array<ResponseQuestion>
  }

  