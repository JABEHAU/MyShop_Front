import { Component, Input } from '@angular/core';
import { BasicProduct } from '../../models/basic-product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: BasicProduct;
  constructor(private router: Router) { }

  redirectProduct(productId: number){
    this.router.navigate(['/product'], { queryParams: { id: productId} });
  }
}
