import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { BuyComponent } from './buy/buy.component';
import { MyShoppingComponent } from './my-shopping/my-shopping.component';



@NgModule({
  declarations: [
    HomeComponent,
    ShoppingCartComponent,
    SearchComponent,
    CategoriesComponent,
    LoginComponent,
    SignUpComponent,
    MyProfileComponent,
    ManageProductsComponent,
    EditProductComponent,
    ProductComponent,
    BuyComponent,
    MyShoppingComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ModuleModule { }
