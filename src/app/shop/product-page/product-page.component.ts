import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { ProductCard } from '@models/ProductCard';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  public product: ProductCard;
  public photoUrl: string;
  public unsubscriber$: Subject<void> = new Subject();

  constructor(public productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.currentProduct$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((currentProduct: ProductCard) => {
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
