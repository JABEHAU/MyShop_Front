import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { LoginComponent } from './modules/login/login.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';
import { EditProductComponent } from './modules/edit-product/edit-product.component';
import { ProductComponent } from './modules/product/product.component';
import { BuyComponent } from './modules/buy/buy.component';
import { MyShoppingComponent } from './modules/my-shopping/my-shopping.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'product', component: ProductComponent },
  { path: 'edit-product', component: EditProductComponent },
  { path: 'edit-product', component: EditProductComponent },
  { path: 'cart', component: ShoppingCartComponent/*Carrito*/ },
  { path: 'c', component: CategoriesComponent},
  { path: 'shop', component: BuyComponent},
  { path: 'my-shopping', component: MyShoppingComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
