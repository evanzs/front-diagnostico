import { Principle } from "./principle"

export interface Project {
  name:string,
  _id:string,
  description:string
  principles:Array<Principle>
  answers:Array<string>
}