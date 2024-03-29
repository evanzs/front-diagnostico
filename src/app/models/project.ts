import { Principle } from "./principle"

export interface Project {
  name:string,
  _id:string,
  description:string
  reason:string;
  city:string;
  principles:Array<Principle>
  answers:Array<string>
  updateAt:Date;
  createAt:Date;
  tagFilter:string[]
}