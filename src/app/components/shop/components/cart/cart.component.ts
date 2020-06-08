import { Component } from '@angular/core';
import { CartFacadeService } from '@store/facades/cart.facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
	constructor(public cartFacadeService: CartFacadeService) {}
}
