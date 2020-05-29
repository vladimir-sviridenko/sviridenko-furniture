import { Injectable } from '@angular/core';
import { Facade } from '@models/Facade';
import { ProductOptionService } from '@models/ProductOptionsService';
import { ProductOption } from '@models/enums/ProductOption.enum';

@Injectable()
export class FacadeService implements ProductOptionService<Facade> {

  public id: string = 'Facade';
  public name: string = ProductOption[this.id];
  public options: Facade[] = [{id: '1', name: 'test', category: 1}];

  constructor() { }
}
