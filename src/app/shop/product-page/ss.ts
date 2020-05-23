if (this.productsService.albums) {
  this.route.params
  .pipe(takeUntil(this.unsubscriber$))
  .subscribe((params: Params) => {
    this.updateProduct(params.albumId, params.productId);
  });
} else {
  combineLatest([
    this.productsService.albums$,
    this.route.params
  ])
  .pipe(takeUntil(this.unsubscriber$))
  .subscribe(([albums, params]: [Album[], Params]) => {
    this.updateProduct(params.albumId, params.productId);
  });
}


if (this.productsService.albums) {
  this.route.params
  .pipe(takeUntil(this.unsubscriber$))
  .subscribe((params: Params) => {
    this.updateProductCards(params.albumId);
  });
} else {
  combineLatest([this.productsService.albums$, this.route.params])
  .pipe(takeUntil(this.unsubscriber$))
  .subscribe(([albums, params]: [Album[], Params]) => {
    this.updateProductCards(params.albumId);
  });
}