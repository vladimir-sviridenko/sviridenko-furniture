import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { ProductCard } from '@models/ProductCard';
import { Subject, combineLatest, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from '@models/Album';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  public product: ProductCard;
  public unsubscriber$: Subject<void> = new Subject();

  constructor(
    public productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.productsService.isProductCardsLoaded = true;
  }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.productsService.albums$
    ])
    .pipe(takeUntil(this.unsubscriber$))
    .subscribe(([params, albums]: [Params, Album[]]) => {
      const albumId = parseInt(params.albumId, 10);
      const productId = parseInt(params.productId, 10);
      const success: boolean = this.productsService.updateProduct(albumId, productId);
      if (!success) {
        this.router.navigate(['/not-found']);
      }
    });

    this.productsService.currentProduct$
    .pipe(takeUntil(this.unsubscriber$))
    .subscribe((currentProduct: ProductCard) => {
      this.product = currentProduct;
      console.log(this.product);
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
    this.productsService.isProductCardsLoaded = false;
  }
}
