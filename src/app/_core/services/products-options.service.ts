import { Injectable } from '@angular/core';
import { ProductOptionAlbum } from '@models/ProductOptionAlbum';
import { OptionType } from '@models/enums/OptionType.enum';
import { ProductOption } from '@models/ProductOption';
import { SelectedOption } from '@models/SelectedOption';

@Injectable()
export class ProductsOptionsService {

  private baseUrl: string = './assets/images/options';

  private optionAlbums: ProductOptionAlbum[] = [
    {
      type: OptionType.Skin,
      groups: [
        {
          name: 'Древесные матовые',
          options: [
            this.skinFabric('3T', 'Белое дерево', 1),
            this.skinFabric('3T', 'Белое дерево', 1),
            this.skinFabric('1441', 'Белый распил', 1),
            this.skinFabric('2584-2', 'Венге серебро', 1),
            this.skinFabric('2584-1', 'Венге золото', 1),
            this.skinFabric('1012', 'Распил перламутр', 1),
            this.skinFabric('11014', 'Ива светлая', 1),
            this.skinFabric('241TP', 'Дуб белфорд', 1),
            this.skinFabric('8195', 'Берёза', 1),
            this.skinFabric('9132', 'Ясень натуральный', 1),
            this.skinFabric('5028', 'Дуб светлый', 1),
            this.skinFabric('631TK', 'Ларче светлый', 1),
            this.skinFabric('512TE', 'Дуб сонома светлый', 1),
            this.skinFabric('194-7T', 'Венге светлый', 1),
            this.skinFabric('203-6T', 'Ель карпатская', 1),
            this.skinFabric('13T', 'Дуб молодой', 1),
            this.skinFabric('14083', 'Серое дерево', 1),
            this.skinFabric('9111', 'Орех перламутр', 1),
            this.skinFabric('513TE', 'Дуб сонома тёмный', 1),
            this.skinFabric('9156', 'Дерево торнадо', 1),
            this.skinFabric('246-2T', 'Дуб антик', 1),
            this.skinFabric('246T', 'Старое дерево', 1),
            this.skinFabric('5029', 'Дуб тёмный', 1),
            this.skinFabric('9301', 'Зебрано горизонт', 1),
            this.skinFabric('11015', 'Ива тёмная', 1),
            this.skinFabric('9346-6', 'Венге шоколад', 1),
            this.skinFabric('9345-6', 'Венге табакко', 1),

            this.skinFabric('473', 'Риф белоснежный', 2),

            this.skinFabric('9187-1', 'Лиственица сибирская', 3),
            this.skinFabric('9187-5', 'Лиственица камчасткая', 3),
            this.skinFabric('9187-3', 'Лиственница приморская', 3),
            this.skinFabric('9187-6', 'Лиственица амурская', 3),
            this.skinFabric('011', 'Томан', 3)
          ]
        },
        {
          name: 'Древесные патинированные',
          options: [
            this.skinFabric('5005', 'Роялвуд белый', 2),
            this.skinFabric('5009', 'Роялвуд жемчуг', 2),
            this.skinFabric('5098', 'Роялвуд крем', 2),
            this.skinFabric('5010', 'Роялвуд кофе', 2),
            this.skinFabric('5011', 'Роялвуд серый', 2),
            this.skinFabric('5092', 'Роялвуд бордо', 2),
            this.skinFabric('5095', 'Роялвуд графит', 2),
            this.skinFabric('54', 'Патина премиум', 2),
            this.skinFabric('5457', 'Патина ясень серебро', 2),
            this.skinFabric('85', 'Патина ясень золото', 2)
          ]
        }
      ]
    },
    {
      type: OptionType.Facade,
      groups: [{
        name: 'Простые фрезировки',
        options: [
          this.facadeFabric('01', 'Мыло', 1),
          this.facadeFabric('02', 'Зигзаг', 1),
          this.facadeFabric('03', 'Квадро', 1),
          this.facadeFabric('04', 'Лжевыборка', 1),
          this.facadeFabric('05', 'Порту', 1),
          this.facadeFabric('06', 'Змейка', 1)
        ]
      }]
    }
  ];

  constructor() { }

  public getOptionAlbumByType(type: OptionType): ProductOptionAlbum {
    return this.optionAlbums.find((album) => album.type === type);
  }

  public getOptionAlbumsByTypes(types: OptionType[]): ProductOptionAlbum[] {
    return this.optionAlbums.filter((album) => types.some((type) => type === album.type));
  }

  public getDefaultSelectedOption(albums: ProductOptionAlbum[]): SelectedOption[] {
    return albums.map((album) => {
      return {
        type: album.type,
        option: album.groups[0].options[0]
      };
    });
  }

  private facadeFabric(id: string, name: string, category: number) {
    const photoUrl = {
      low: `${this.baseUrl}/facade/low/${category}/${id}.jpg`,
      high: `${this.baseUrl}/facade/high/${category}/${id}.jpg`
    };
    return { id, name, category, photoUrl };
  }

  private skinFabric(id: string, name: string, category: number) {
    const photoUrl = {
      low: `${this.baseUrl}/skin/low/${category}/${id}.jpg`,
      high: `${this.baseUrl}/skin/high/${category}/${id}.jpg`
    };
    return { id, name, category, photoUrl };
  }
}
