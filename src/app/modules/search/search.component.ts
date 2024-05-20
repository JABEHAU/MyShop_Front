import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicProduct } from 'src/app/shared/models/basic-product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  protected filter: string = '';
  protected products: BasicProduct[] = [];
  protected isLoadingProducts: boolean = true;
  constructor(private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filter = params['search'];
      this.loadData();
    });
  }

  async loadData() {
    this.isLoadingProducts = true;
    this.products = await this.productsService.searchByFilter(this.filter).toPromise();
    this.isLoadingProducts = false;
  }
}
