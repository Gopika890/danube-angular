export interface Product{

  _id?:string;
  name:string;
  shortDescription:string;
  Description:string;
  price:number;
  discount:number;
  images:string[];
  categoryId:string;
  isFeatured:boolean;
  isNew2:boolean;

}
