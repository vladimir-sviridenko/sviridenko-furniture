import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@models/Product';
import { Subject } from 'rxjs';
import { takeUntil, filter, take } from 'rxjs/operators';
import { ShopFacadeService } from '@store/shop/shop.facade';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public product: Product;
  public photoUrl: string;

  constructor(public shopFacadeService: ShopFacadeService) {}

  ngOnInit(): void {
    this.shopFacadeService.currentProduct$.pipe(take(1))
      .subscribe((currentProduct: Product) => {
        this.product = currentProduct;
        this.photoUrl = currentProduct.photoUrl;
      });
  }
}
