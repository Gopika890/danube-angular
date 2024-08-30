import { CartItem } from "./cartitem"

export interface Order{
  items:CartItem[],
  paymentType:string,
  address:any,
  date:Date,
  totalAmount:number,
  status?:string

}



