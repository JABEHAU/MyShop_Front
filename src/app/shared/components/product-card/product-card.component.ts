import { Component, Input } from '@angular/core';
import { BasicProduct } from '../../models/basic-product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: BasicProduct;
  constructor() { }

}
