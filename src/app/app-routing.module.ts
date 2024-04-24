import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },{
    path: 'cart', component: ShoppingCartComponent
  },
  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
