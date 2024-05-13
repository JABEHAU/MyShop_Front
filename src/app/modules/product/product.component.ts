import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  protected productId: number;
  protected product: Product;
  protected isLoadingProduct: boolean = false;

  
  constructor(private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.loadData();
    });
  }

  async loadData() {
    this.isLoadingProduct = true;
    this.product = await this.productService.getProduct(this.productId).toPromise();
    this.isLoadingProduct = false;
  }
}
