import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CategoryWithProducts } from 'src/app/shared/models/category-with-products.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  protected topCategories: any[] = [];
  protected isLoadingProducts: boolean = true;
  protected categoriesWithProducts: CategoryWithProducts[] = [];

  constructor(private categoriesService: CategoriesService,
    private productService: ProductsService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.isLoadingProducts = true;
    await this.loadData();
    this.isLoadingProducts = false;
  }

  async loadData() {
    this.topCategories = await this.categoriesService.getTopCategoriesInOffer().toPromise();
    this.categoriesWithProducts = await this.categoriesService.getCategories().toPromise();
    this.categoriesWithProducts.forEach(async (category) => {
      category.productos = await this.productService.getTopProductsByCategory(category.categoriaId).toPromise();
    });
  }

  searchCategory(category: any) {
    this.router.navigate(['/c'], { queryParams: { id: category.categoriaId } });
  }
}
