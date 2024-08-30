import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../types/product';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioButton} from '@angular/material/radio';
import {MatRadioModule} from '@angular/material/radio';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../types/order';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatRadioButton,MatRadioModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  cartService=inject(CartService);
  ngOnInit(){
    this.cartService.init();
  }

  get cartItems(){
    return this.cartService.items;
  }


sellingPrice(product:Product){
  return  Math.round(product.price - (product.price * product.discount)/100)
}

addToCart(productId:string,quantity:number){
  this.cartService.addToCart(productId,quantity).subscribe(result=>{
    this.cartService.init();
  })

}


get totalAmount(){
  let amount=0;

  for(let index=0;index<this.cartItems.length;index++){
    const element=this.cartItems[index];
    amount+=this.sellingPrice(element.product)*element.quantity
  }
  return amount;

}

orderStep:number=0;
formbuilder=inject(FormBuilder);
paymentType='cash';
addressForm=this.formbuilder.group({
  address1:[''],
  address2:[''],
  city:[''],
  pincode:[''],

})
checkOut(){
  this.orderStep=1;
}
addAddress(){
  this.orderStep=2;
}
orderService=inject(OrdersService);

completeOrder(){      //shows in the console what all u order
  let order:Order={
    items:this.cartItems,
    paymentType:this.paymentType,
    address:this.addressForm.value,
    date:new Date(),
    totalAmount:this.totalAmount,
  };
  this.orderService.addOrder(order).subscribe((result)=>{
    alert('your order is placed.');
    this.cartService.init();
    this.orderStep=0;

  });
  console.log(order);
}


}
