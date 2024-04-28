import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    ShoppingCartComponent,
    SearchComponent,
    CategoriesComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ModuleModule { }
