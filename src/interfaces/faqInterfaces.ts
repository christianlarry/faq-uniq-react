export interface FaqModel{
  _id:string,
  title:string,
  time_updated:number,
  questions:string[],
  answer:string
}