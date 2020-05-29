import { Component, OnInit } from '@angular/core';

import { ShopFacadeService } from '@store/shop/shop.facade';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(public shopFacadeService: ShopFacadeService) {}

  ngOnInit(): void {}
}
