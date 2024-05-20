import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SaleItem } from 'src/app/shared/models/sale-item.model';
import { Sale } from 'src/app/shared/models/sale.model';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';
import { User } from 'src/app/shared/models/user.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit, OnDestroy {
  protected items: ShoppingCart[] = [];
  protected user: User = {
    usuarioId: 0,
    correo: '',
    nombre: '',
    telefono: '',
    pais: '',
    estado: '',
    ciudad: '',
    domicilio: '',
    cp: '',
    esVendedor: 0,
    numCtaBeneficiario: '',
    nombreCtaBeneficiario: ''
  };
  protected totalShoppingCart: number = 0;
  protected sendCost: number = 0;
  protected paySuccess: boolean = false;
  protected isLoadingButtonPay: boolean = false;
  protected cardNumber: string = '';
  protected expirationCard: string = '';
  protected cvvCard: string = '';

  constructor(private router: Router,
    private localStorageService: LocalStorageService,
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService ) { }

  ngOnInit(): void {
    let user = this.localStorageService.getUser();
    if (user)
      this.user = user;
    let itemsJson = sessionStorage.getItem('itemsToBuy');
    if (itemsJson && this.user)
      this.items = JSON.parse(itemsJson);
    else
      this.router.navigateByUrl('home');

    this.calculateTotal();

  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('itemsToBuy');
  }

  async pay(form: NgForm) {
    if(!form.valid)
      return

    this.isLoadingButtonPay = true;
    await this.productService.insertSale(this.getSaleRequest()).toPromise();
    this.items.forEach(async item=>{
      if(item.itemId>0)
        await this.shoppingCartService.deleteItem(item.itemId).toPromise();
    });
    this.isLoadingButtonPay = false;
    this.paySuccess=true;
  }

  calculateTotal() {
    this.totalShoppingCart = 0;
    this.items.forEach(item => {
      if (item.productDetail.esOferta == 0) {
        this.totalShoppingCart += item.cantidad * item.productDetail.precio;
      } else {
        this.totalShoppingCart += item.cantidad * item.productDetail.precioOferta;
      }
    })
  }

  getSaleRequest(){
    let sale: Sale={
      clienteId: this.user.usuarioId,
      numCtaPago: this.cardNumber,
      total: this.totalShoppingCart,
      paisEntrega: this.user.pais,
      estadoEntrega: this.user.estado,
      ciudadEntrega: this.user.ciudad,
      cpEntrega: this.user.cp,
      domicilioEntrega: this.user.domicilio,
      saleItems: this.getSaleItem()
    };
    return sale;
  }

  getSaleItem(): SaleItem[]{
    let saleItems: SaleItem[]=[];

    this.items.forEach(item=>{
      if(item.productDetail.esOferta==0){
        let saleItem: SaleItem={
          ventaId: 0,
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: item.productDetail.precio,
          totalItem: item.cantidad*item.productDetail.precio
        }
        saleItems.push(saleItem);
      }else{
        let saleItem: SaleItem={
          ventaId: 0,
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: item.productDetail.precioOferta,
          totalItem: item.cantidad*item.productDetail.precioOferta
        }
        saleItems.push(saleItem);
      }
    });

    return saleItems;
  }
}
