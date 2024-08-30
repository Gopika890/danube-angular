import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,ProductCardComponent,CarouselModule,RouterLink, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }

  customerService=inject(CustomerService);
  newProducts:Product[]=[];
  featuredProducts:Product[]=[];
  bannerImages:Product[]=[];
  cartService=inject(CartService);

  ngOnInit(){
    this.customerService.getFeaturedProducts().subscribe((result) => {
      // Ensure result is always treated as an array
      this.featuredProducts = Array.isArray(result) ? result : [result];
      console.log(this.featuredProducts);

      // Ensure bannerImages.push receives an array
      if (Array.isArray(result)) {
        this.bannerImages.push(...result);
      } else {
        this.bannerImages.push(result);
      }
    });

    this.customerService.getNewProducts().subscribe((result)=>{
      this.newProducts = Array.isArray(result) ? result : [result];
      console.log(this.newProducts)

      if (Array.isArray(result)) {
        this.bannerImages.push(...result);
      } else {
        this.bannerImages.push(result);
      }
    });

    this.cartService.init();

  }


}
