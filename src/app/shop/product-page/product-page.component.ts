import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { Product } from '@models/Product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  public product: Product;
  public photoUrl: string;
  public unsubscriber$: Subject<void> = new Subject();

  constructor(public productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.currentProduct$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((currentProduct: Product) => {
        this.product = currentProduct;
        this.photoUrl = currentProduct.photoUrl;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
    this.productsService.isLoading = true;
  }
}
