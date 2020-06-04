import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ShopFacadeService } from '@store/shop/shop.facade';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private shopFacadeService: ShopFacadeService) {
    this.shopFacadeService.hideShopLoader();
  }
}
