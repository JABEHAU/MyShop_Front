import { Component, OnInit } from '@angular/core';
import { SaleByClient } from 'src/app/shared/models/sale-by-client.model';
import { User } from 'src/app/shared/models/user.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-my-shopping',
  templateUrl: './my-shopping.component.html',
  styleUrls: ['./my-shopping.component.css']
})
export class MyShoppingComponent implements OnInit {

  protected sales: SaleByClient[]=[];
  protected user: User | null = null;
  constructor(private productService: ProductsService,
    private localStorageService: LocalStorageService
  ) { }

  async ngOnInit() {
    this.user = this.localStorageService.getUser();

    if(this.user)
      this.sales = await this.productService.getSalesByUser(this.user.usuarioId).toPromise();
    console.log(this.sales);
  }

}
