import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private productsService: ProductsService) {
    this.productsService.isLoading = false;
  }
}
