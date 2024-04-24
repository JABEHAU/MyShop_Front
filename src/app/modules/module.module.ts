import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    HomeComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModuleModule { }
