import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';
import { User } from 'src/app/shared/models/user.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  protected user: User | null = null;
  protected shoppingCart: ShoppingCart[] = [];
  protected totalShoppingCart: number = 0;
  protected sendCost: number = 0;
  protected isLoadingProducts: boolean = false;

  constructor(private localStorageService: LocalStorageService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(){
    this.isLoadingProducts = true;
    this.user = this.localStorageService.getUser();
    if (this.user)
      this.shoppingCart = await this.shoppingCartService.getShoppingCartByUser(this.user.usuarioId).toPromise();

    this.calculateTotal();
    this.isLoadingProducts = false;
  }

  calculateTotal() {
    this.totalShoppingCart = 0;
    this.shoppingCart.forEach(item => {
      if (item.productDetail.esOferta == 0) {
        this.totalShoppingCart += item.cantidad * item.productDetail.precio;
      } else {
        this.totalShoppingCart += item.cantidad * item.productDetail.precioOferta;
      }

    })
  }

  async deleteItem(item: ShoppingCart){
    await this.shoppingCartService.deleteItem(item.itemId).toPromise();
    this.loadData();
  }

  buy() {
    if(this.shoppingCart && this.shoppingCart.length>0){
      sessionStorage.setItem('itemsToBuy', JSON.stringify(this.shoppingCart));
      this.router.navigateByUrl('shop');
    }
  }

  restAmount(item: ShoppingCart) {
    if (item.cantidad > 1)
      item.cantidad--;
    this.calculateTotal();
  }

  addAmount(item: ShoppingCart) {
    if (item.cantidad < item.productDetail.disponible)
      item.cantidad++;
    this.calculateTotal();
  }
}
