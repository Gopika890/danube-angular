import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule,RouterLink,MatIconModule,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
@Input() product!:Product;

get sellingPrice(){
  return  Math.round(this.product.price - (this.product.price*this.product.discount)/100)
}

cartService=inject(CartService);

addToCart(product:Product){
  console.log(product);
  if(!this.isProductInCart(product._id!)){
    this.cartService.addToCart(product._id!,1).subscribe(()=>{
      this.cartService.init();
    });
  }else{
    this.cartService.removeFromCart(product._id!).subscribe(()=>{
      this.cartService.init();
    });
  }

}
isProductInCart(productId: string): boolean {
  return !!this.cartService.items.find((x) => x.product._id === productId); // Corrected comparison
}

}



