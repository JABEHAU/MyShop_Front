import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HomeComponent,
    ShoppingCartComponent,
    SearchComponent,
    CategoriesComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgModule
  ]
})
export class ModuleModule { }
