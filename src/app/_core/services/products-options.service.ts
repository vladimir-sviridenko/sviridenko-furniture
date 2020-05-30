import { Injectable } from '@angular/core';
import { ProductOptionAlbum } from '@models/ProductOptionAlbum';
import { OptionType } from '@models/enums/OptionType.enum';

@Injectable()
export class ProductsOptionsService {

  private baseUrl: string = './assets/images/options';

  private optionAlbums: ProductOptionAlbum[] = [
    {
      type: OptionType.Skin,
      options: [
        this.skinFabric('3T', 'Тест', 1)
      ]
    },
    {
      type: OptionType.Facade,
      options: [
        this.facadeFabric('Монолит', 'Tect', 1)
      ]
    }
  ];

  constructor() { }

  public getOptionAlbumByType(type: OptionType) {
    return this.optionAlbums.find((album) => album.type === type);
  }

  public getOptionAlbumsByTypes(types: OptionType[]) {
    return this.optionAlbums.filter((album) => types.some((type) => type === album.type));
  }

  private facadeFabric(id: string, name: string, category: number) {
    const photoUrl = {
      low: `${this.baseUrl}/facade/low/${category}/${id}`,
      high: `${this.baseUrl}/facade/low/${category}/${id}`
    };
    return {id, name, category, photoUrl};
  }

  private skinFabric(id: string, name: string, category: number) {
    const photoUrl = {
      low: `${this.baseUrl}/skin/low/${category}/${id}`,
      high: `${this.baseUrl}/skin/low/${category}/${id}`
    };
    return {id, name, category, photoUrl};
  }
}
