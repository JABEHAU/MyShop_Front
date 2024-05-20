import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { User } from 'src/app/shared/models/user.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';
import { BasicProduct } from 'src/app/shared/models/basic-product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  protected productId: number;
  protected product: Product;
  protected isLoadingProduct: boolean = false;
  protected average: number = 0;
  protected isUserLogin: boolean = false;
  protected user: User | null = null;
  protected itemExists: boolean = false;


  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private ShopCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.isUserLogin = this.localStorageService.isUserLoggedIn();
      this.user = this.localStorageService.getUser();
      this.loadData();
    });
  }

  async loadData() {
    this.isLoadingProduct = true;
    this.product = await this.productService.getProduct(this.productId).toPromise();
    await this.calculateAverage(this.product.comentarios);
    this.verifyItemExists();
    this.isLoadingProduct = false;
  }

  async calculateAverage(comentarios: Comment[]) {
    const sumGrades = comentarios.reduce((acumulator, commentario) => acumulator + commentario.calificacion, 0);
    this.average = sumGrades / comentarios.length;
  }

  async buy() {
    if (this.isUserLogin) {
      let items: ShoppingCart[] = [];
      let basicProduct: BasicProduct = await this.productService.getBasicProduct(this.productId).toPromise()
      let item: ShoppingCart = {
        itemId: 0,
        productoId: this.productId,
        cantidad: 1,
        productDetail: basicProduct
      }
      items.push(item);
      sessionStorage.setItem('itemsToBuy', JSON.stringify(items));
      this.router.navigateByUrl('shop');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  addToCart() {
    if (this.isUserLogin) {
      if (this.user) {
        let userId = this.user.usuarioId;
        let productId = this.product.productoId;
        this.ShopCartService.insertItem(productId, userId).toPromise();
        this.itemExists=true;
      }
    } else {
      this.router.navigateByUrl('login');
    }
  }

  async verifyItemExists() {
    if (this.user)
      this.itemExists = await this.ShopCartService.verifyItemExistsAsync(this.productId, this.user.usuarioId).toPromise();
  }

  generarArray(num: number): any[] {
    return new Array(num);
  }
}
