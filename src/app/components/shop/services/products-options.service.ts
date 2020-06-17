import { Injectable } from '@angular/core';
import { OptionAlbum } from '@shop/models/option-album';
import { OptionType } from '@shop/models/enums/option-type.enum';
import { PhotoUrl } from '@shop/models/photo-url';
import { Option } from '@shop/models/option';
import { OptionGroup } from '@shop/models/option-group';

@Injectable()
export class ProductsOptionsService {

	private baseUrl: string = './assets/images/options';

	private optionAlbums: OptionAlbum[] = [
		{
			type: OptionType.Skin,
			groups: [
				{
					name: 'Древесные матовые',
					options: [
						this.skinFabric('3T', 'Белое дерево', '1'),
						this.skinFabric('1441', 'Белый распил', '1'),
						this.skinFabric('2584-2', 'Венге серебро', '1'),
						this.skinFabric('2584-1', 'Венге золото', '1'),
						this.skinFabric('1012', 'Распил перламутр', '1'),
						this.skinFabric('11014', 'Ива светлая', '1'),
						this.skinFabric('241TP', 'Дуб белфорд', '1'),
						this.skinFabric('8195', 'Берёза', '1'),
						this.skinFabric('9132', 'Ясень натуральный', '1'),
						this.skinFabric('5028', 'Дуб светлый', '1'),
						this.skinFabric('631TK', 'Ларче светлый', '1'),
						this.skinFabric('512TE', 'Дуб сонома светлый', '1'),
						this.skinFabric('194-7T', 'Венге светлый', '1'),
						this.skinFabric('203-6T', 'Ель карпатская', '1'),
						this.skinFabric('13T', 'Дуб молодой', '1'),
						this.skinFabric('14083', 'Серое дерево', '1'),
						this.skinFabric('9111', 'Орех перламутр', '1'),
						this.skinFabric('513TE', 'Дуб сонома тёмный', '1'),
						this.skinFabric('9156', 'Дерево торнадо', '1'),
						this.skinFabric('246-2T', 'Дуб антик', '1'),
						this.skinFabric('246T', 'Старое дерево', '1'),
						this.skinFabric('5029', 'Дуб тёмный', '1'),
						this.skinFabric('9301', 'Зебрано горизонт', '1'),
						this.skinFabric('11015', 'Ива тёмная', '1'),
						this.skinFabric('9346-6', 'Венге шоколад', '1'),
						this.skinFabric('9345-6', 'Венге табакко', '1'),

						this.skinFabric('473', 'Риф белоснежный', '2'),

						this.skinFabric('9187-1', 'Лиственица сибирская', '3'),
						this.skinFabric('9187-5', 'Лиственица камчасткая', '3'),
						this.skinFabric('9187-3', 'Лиственница приморская', '3'),
						this.skinFabric('9187-6', 'Лиственица амурская', '3'),
						this.skinFabric('011', 'Томан', '3')
					]
				},
				{
					name: 'Древесные патинированные',
					options: [
						this.skinFabric('5005', 'Роялвуд белый', '2'),
						this.skinFabric('5009', 'Роялвуд жемчуг', '2'),
						this.skinFabric('5098', 'Роялвуд крем', '2'),
						this.skinFabric('5010', 'Роялвуд кофе', '2'),
						this.skinFabric('5011', 'Роялвуд серый', '2'),
						this.skinFabric('5092', 'Роялвуд бордо', '2'),
						this.skinFabric('5095', 'Роялвуд графит', '2'),
						this.skinFabric('54', 'Патина премиум', '2'),
						this.skinFabric('5457', 'Патина ясень серебро', '2'),
						this.skinFabric('85', 'Патина ясень золото', '2'),
						this.skinFabric('7539', 'Патина фисташка', '3'),
						this.skinFabric('246TP', 'Зелень патина', '2'),
						this.skinFabric('74', 'Патина скай', '2'),
						this.skinFabric('7534', 'Патина дуб бирюза', '3'),
						this.skinFabric('166', 'Дуб терракот', '2'),
						this.skinFabric('165', 'Дуб болотный', '2'),
						this.skinFabric('162', 'Дуб аквамарин', '2'),
						this.skinFabric('160', 'Дуб адриатика', '2'),
						this.skinFabric('5018', 'Роялвуд голубой', '2'),
						this.skinFabric('5094', 'Роялвуд джинс', '2'),
					]
				},
				{
					name: 'Древесные глянцевые',
					options: [
						this.skinFabric('21HG', 'Зербано белый', '4'),
						this.skinFabric('6HG', 'Дуб золото светлый', '4'),
						this.skinFabric('241G', 'Зебрано', '3'),
						this.skinFabric('28HG', 'Дуб золото тёмный', '4')
					]
				},
				{
					name: 'Однотонные глянцевые',
					options: [
						this.skinFabric('6G', 'Белый', '2'),
						this.skinFabric('2126', 'Крем глянец', '2'),
						this.skinFabric('3041PG', 'Крем брюлле', '4'),
						this.skinFabric('35G', 'Ваниль глянец', '2'),
						this.skinFabric('16G', 'Лимон', '2'),
						this.skinFabric('1495G', 'Оранжевый', '2'),
						this.skinFabric('511G', 'Капучино', '2'),
						this.skinFabric('283G', 'Красный', '2'),
						this.skinFabric('641G', 'Бордо', '2'),
						this.skinFabric('803G', 'Лайм', '3'),
						this.skinFabric('333G', 'Виолетта', '2'),
						this.skinFabric('515G', 'Баклажан', '2'),
						this.skinFabric('7740', 'Шоколад глянец', '2'),
						this.skinFabric('2905', 'Чёрный', '2'),
						this.skinFabric('18003', 'Сирень глянец', '3'),
						this.skinFabric('2129G', 'Графит', '2'),
						this.skinFabric('535-6TG', 'Какао пурламутр', '2'),
						this.skinFabric('1200G', 'Белый (Тёплый)', '2')
					]
				},
				{
					name: 'Однотонные матовые',
					options: [
						this.skinFabric('93005', 'Белый софт', '2'),
						this.skinFabric('14027', 'Белый матовый', '1'),
						this.skinFabric('35', 'Ваниль', '1'),
						this.skinFabric('1495', 'Оранжевый матовый', '1'),
						this.skinFabric('1291', 'Эвкалипт', '1'),
						this.skinFabric('109TP', 'Синий', '1'),
						this.skinFabric('8916', 'Супермат панакота', '2'),
						this.skinFabric('8925', 'Супермат фисташка', '2'),
						this.skinFabric('8913', 'Супермат оливка', '2'),
						this.skinFabric('8912', 'Супермат шардоне', '2'),
						this.skinFabric('7029', 'Шоколад софт', '2'),
						this.skinFabric('013', 'Аквамарин', '2'),
						this.skinFabric('015', 'Ниагара', '2'),
						this.skinFabric('018', 'Фиалка', '2'),
						this.skinFabric('854', 'Латте', '2'),
						this.skinFabric('855', 'Грей', '2'),
						this.skinFabric('856', 'Графит', '2')
					]
				},
				{
					name: 'Фантазийные матовые',
					options: [
						this.skinFabric('M06', 'Камень коричневый', '3'),
						this.skinFabric('M07', 'Камень светло-серый', '3'),
					]
				},
				{
					name: 'Металики',
					options: [
						this.skinFabric('125HG', 'Белый', '3'),
						this.skinFabric('2106HG', 'Ваниль металлик', '3'),
						this.skinFabric('9519HG', 'Кремовый', '3'),
						this.skinFabric('805HG', 'Лимон', '3'),
						this.skinFabric('303HG', 'Шампань светлая', '3'),
						this.skinFabric('2113HG', 'Капучино металлик', '3'),
						this.skinFabric('501HG', 'Шампань', '3'),
						this.skinFabric('2133HG', 'Шоколад металлик', '3'),
						this.skinFabric('151CHG', 'Розовая сирень', '3'),
						this.skinFabric('9518HG', 'Абрикос', '4'),
						this.skinFabric('264HG', 'Оранжевый', '3'),
						this.skinFabric('18HG', 'Апельсин', '4'),
						this.skinFabric('401HG', 'Красный', '3'),
						this.skinFabric('400HG', 'Фиалка', '3'),
						this.skinFabric('857HG', 'Фиолетовый', '3'),
						this.skinFabric('2119HG', 'Малина металлик', '3'),
						this.skinFabric('404HG', 'Корица', '3'),
						this.skinFabric('903HG', 'Пурпур', '3'),
						this.skinFabric('308HG', 'Голубой', '3'),
						this.skinFabric('067HG', 'Бирюза', '3'),
						this.skinFabric('760HG', 'Морская волна', '4'),
						this.skinFabric('802-6THG', 'Синий', '3'),
						this.skinFabric('666HG', 'Серебро тёмное', '3'),
						this.skinFabric('757HG', 'Фисташковый', '3'),
						this.skinFabric('865HG', 'Яблоко', '4')
					]
				}
			]
		},
		{
			type: OptionType.Facade,
			groups: [{
				name: 'Простые фрезировки',
				options: [
					this.facadeFabric('01', 'Мыло', '1'),
					this.facadeFabric('02', 'Зигзаг', '1'),
					this.facadeFabric('03', 'Квадро', '1'),
					this.facadeFabric('04', 'Лжевыборка', '1'),
					this.facadeFabric('05', 'Порту', '1'),
					this.facadeFabric('06', 'Змейка', '1')
				]
			}]
		}
	];

	private facadeFabric(id: string, name: string, category: string): Option {
		const photoUrl: PhotoUrl = {
			low: `${this.baseUrl}/facade/low/${category}/${id}.jpg`,
			high: `${this.baseUrl}/facade/high/${category}/${id}.jpg`
		};
		return { id, name, category: parseInt(category, 10), photoUrl };
	}

	private skinFabric(id: string, name: string, category: string): Option  {
		const photoUrl: PhotoUrl = {
			low: `${this.baseUrl}/skin/low/${category}/${id}.jpg`,
			high: `${this.baseUrl}/skin/high/${category}/${id}.jpg`
		};
		return { id, name, category: parseInt(category, 10), photoUrl };
	}
	
	public getOptionAlbumByType(type: OptionType): OptionAlbum {
		return this.optionAlbums.find((album: OptionAlbum) => album.type === type);
	}

	public getOptionBy(type: OptionType, id: string): Option {
		let resultOption: Option = null;
		this.optionAlbums.slice(0).forEach((album: OptionAlbum, albumIndex: number, albums: OptionAlbum[]) => {
			album.groups.forEach((group: OptionGroup, groupIndex: number, groups: OptionGroup[]) => {
				const productOption: Option = group.options.find((option: Option) =>
					(album.type === type && option.id === id)
				);
				if (Boolean(productOption)) {
					albums.splice(0);	// stop outer loops
					groups.splice(0);
					resultOption = productOption;
				}
			});
		});

		return resultOption;
	}

	public getOptionAlbumsByTypes(types: OptionType[]): OptionAlbum[] {
		return this.optionAlbums.filter((album: OptionAlbum) =>
				types.some((type: OptionType) => type === album.type));
	}
}
