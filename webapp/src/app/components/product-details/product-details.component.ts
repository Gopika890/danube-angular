import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from "../product-card/product-card.component";
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent,MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  newProducts: any;
  similarProducts:Product[]=[];


  ngOnInit() {
    this.route.params.subscribe((x:any)=>{
      this.getProductDetail(x.id)

    })
  }
  getProductDetail(id:string){
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;
      this.mainImage = this.product.images[0];
      console.log(this.product);
      this.customerService.getProducts('',this.product.categoryId,'',-1,'',1,4).subscribe(result=>{
        this.similarProducts=result;
      })
    });
  }
  changeImage(url: string) {
    this.mainImage = url;
  }

  get sellingPrice() {
    // Calculate the selling price and always round down to the nearest integer
    return Math.round(this.product.price - (this.product.price * this.product.discount) / 100);
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
