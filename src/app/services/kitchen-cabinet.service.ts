import { Injectable } from '@angular/core';

import { KitchenCabinet } from './interfaces/KitchenCabinet';
import { Size } from './interfaces/KitchenCabinet';
import { ProductService } from './interfaces/ProductService';


@Injectable()
export class KitchenCabinetService implements ProductService<KitchenCabinet> {

  public albumId: number = 375686981;
  public title: string = 'Эконом мебель';

  public readonly products: KitchenCabinet[] = [
    this.createProduct('001', 'Шкаф навесной', '72×40×34', 2192),
    this.createProduct('002', 'Шкаф навесной', '72×50×34', 2400),
    this.createProduct('003', 'Шкаф навесной', '72×60×34', 2575),
    this.createProduct('004', 'Шкаф навесной', '72×80×34', 2764),
    this.createProduct('005', 'Шкаф навесной угловой', '72×61×61', 3163),
    this.createProduct('006', 'Шкаф навесной низкий', '36×60×34', 1868),
    this.createProduct('007', 'Шкаф навесной низкий', '36×80×34', 2278),

    this.createProduct('008', 'Шкаф напольный', '82×40×53', 2405),
    this.createProduct('009', 'Шкаф напольный (2 ящика)', '82×40×53', 3884),
    this.createProduct('010', 'Шкаф напольный (3 ящика)', '82×40×53', 4325),
    this.createProduct('011', 'Шкаф напольный', '82×50×53', 2775),
    this.createProduct('012', 'Шкаф напольный', '82×60×53', 3248),
    this.createProduct('013', 'Шкаф напольный (1 ящик)', '82×60×53', 4060),
    this.createProduct('014', 'Шкаф напольный под духовку (1 ящик)', '82×60×53', 3189),
    this.createProduct('015', 'Шкаф напольный', '82×80×53', 3504),
    this.createProduct('016', 'Шкаф напольный угловой', '82×91×53', 4068),
    this.createProduct('017', 'Шкаф-пенал под духовку', '214×60×56', 5564),
    this.createProduct('018', 'Шкаф-пенал', '214×60×56', 7473)
  ];

  constructor() {}

  public createProduct(id: string, name: string, sizeStr: string, price: number): KitchenCabinet {
    const sizeArr: number[] = sizeStr.split('×').map((side) => Number(side));
    const size: Size = {
      height: sizeArr[0],
      width: sizeArr[1],
      depth: sizeArr[2]
    };
    return { id, name, size, price };
  }

  public getPhotoUrl(product: KitchenCabinet): string {
    return `assets/products/kitchen_cabinets/${product.id}.jpg`;
  }
}
