export interface FaqModel{
  _id:string,
  title:string,
  time_updated:number,
  questions:string[],
  answer:string
}

export interface FaqResponseModel{
  data:FaqModel[]
}

export interface FaqCategoryModel{
  _id:string,
  name:string,
  sub_category:FaqSubCategoryModel[]
}

export interface FaqCategoryResponseModel{
  data:FaqCategoryModel[]
}

export interface FaqSubCategoryModel{
  _id:string,
  sub_category:string,
  faqs:string[]
}