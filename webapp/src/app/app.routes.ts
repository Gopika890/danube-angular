import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGaurd } from './core/auth-gaurd';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGaurd } from './core/admin-gaurd';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    canActivate:[authGaurd]

  },
  {
    path:'admin',
    component:AdminDashboardComponent,
    canActivate:[adminGaurd]

  },
  {
    path:"admin/categories",
    component:CategoriesComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"admin/categories/add",
    component:CategoryFormComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"admin/categories/:id",
    component:CategoryFormComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"admin/brands",
    component:BrandsComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"admin/brands/add",
    component:BrandFormComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"admin/brands/:id",
    component:BrandFormComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"admin/products",
    component:ProductsComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"admin/products/add",
    component:ProductFormComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"admin/products/:id",
    component:ProductFormComponent,
    canActivate:[adminGaurd]
  },
  {
    path:"products",
    component:ProductListComponent,
    canActivate:[authGaurd]
  },
  {
    path:"product/:id",
    component:ProductDetailsComponent,
    canActivate:[authGaurd]
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"profile",
    component:UserProfileComponent,
    canActivate:[authGaurd]
  },
  {
    path:"cart",
    component:ShoppingCartComponent,
    canActivate:[authGaurd],

  }
];
