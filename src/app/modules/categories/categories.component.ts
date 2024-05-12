import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicProduct } from 'src/app/shared/models/basic-product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  protected isLoadingProducts: boolean = true;
  protected categoryId: number = 0;
  protected productsList: BasicProduct[] = [];

  constructor(private productService: ProductsService,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['id'];
      this.loadData();
    });
  }

  async loadData(){
    this.isLoadingProducts = true;
    this.productsList = await this.productService.getAllByCategory(this.categoryId).toPromise();
    this.isLoadingProducts = false;
  }

}
