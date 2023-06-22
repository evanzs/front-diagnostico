import { Guideline } from "./guideline";

export interface Principle {
    _id:string;
    name: string;
    description:string;
    guidelines: Guideline[];
    endRate:number;
  }