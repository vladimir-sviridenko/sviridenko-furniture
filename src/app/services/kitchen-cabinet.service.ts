import { Injectable } from '@angular/core';

import { ProductService } from './interfaces/ProductService';
import { ProductCard } from './interfaces/ProductCard';
import { Image } from './interfaces/Image';


@Injectable()
export class KitchenCabinetService implements ProductService {

  public info: [{ id: number, title: string }] = [{id: 375686981, title: 'Эконом мебель'}];

  public products: ProductCard[] = [
    this.productCardFabric(1, 'Шкаф навесной', '72×40×34', 2192),
    this.productCardFabric(2, 'Шкаф навесной', '72×50×34', 2400),
    this.productCardFabric(3, 'Шкаф навесной', '72×60×34', 2575),
    this.productCardFabric(4, 'Шкаф навесной', '72×80×34', 2764),
    this.productCardFabric(5, 'Шкаф навесной угловой', '72×61×61', 3163),
    this.productCardFabric(6, 'Шкаф навесной низкий', '36×60×34', 1868),
    this.productCardFabric(7, 'Шкаф навесной низкий', '36×80×34', 2278),

    this.productCardFabric(8, 'Шкаф напольный', '82×40×53', 2405),
    this.productCardFabric(9, 'Шкаф напольный (2 ящика)', '82×40×53', 3884),
    this.productCardFabric(10, 'Шкаф напольный (3 ящика)', '82×40×53', 4325),
    this.productCardFabric(11, 'Шкаф напольный', '82×50×53', 2775),
    this.productCardFabric(12, 'Шкаф напольный', '82×60×53', 3248),
    this.productCardFabric(13, 'Шкаф напольный (1 ящик)', '82×60×53', 4060),
    this.productCardFabric(14, 'Шкаф напольный под духовку (1 ящик)', '82×60×53', 3189),
    this.productCardFabric(15, 'Шкаф напольный', '82×80×53', 3504),
    this.productCardFabric(16, 'Шкаф напольный угловой', '82×91×53', 4068),
    this.productCardFabric(17, 'Шкаф-пенал под духовку', '214×60×56', 5564),
    this.productCardFabric(18, 'Шкаф-пенал', '214×60×56', 7473)
  ];

  constructor() {}

  productCardFabric(id: number, name: string, size: string, price: number): ProductCard {
    const image: Image = {
      low: '/assets/products/kitchen-cabinets.jpg',
      high: '/assets/products/kitchen-cabinets.jpg'
    };
    return { id, name, image, size, price };
  }

  getProductCards(): ProductCard[] {
    return this.products;
  }

}
