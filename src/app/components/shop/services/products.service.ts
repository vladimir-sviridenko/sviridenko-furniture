import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '@shop/models/product';
import { Size } from '@shop/models/size';
import { Album } from '@shop/models/album';
import { OptionAlbum } from '@shop/models/option-album';
import { OptionType } from '@shop/models/enums/option-type.enum';
import { ProductsOptionsService } from './products-options.service';
import { PhotoUrl } from '@shop/models/photo-url';

@Injectable()
export class ProductsService {

	private kitchenKabitents: Product[] = [
		this.kitchenCabinetFabric('1', 'Шкаф навесной', '72×40×34', '2192'),
		this.kitchenCabinetFabric('2', 'Шкаф навесной', '72×50×34', '2400'),
		this.kitchenCabinetFabric('3', 'Шкаф навесной', '72×60×34', '2575'),
		this.kitchenCabinetFabric('4', 'Шкаф навесной', '72×80×34', '2764'),
		this.kitchenCabinetFabric('5', 'Шкаф навесной угловой', '72×61×61', '3163'),
		this.kitchenCabinetFabric('6', 'Шкаф навесной низкий', '36×60×34', '1868'),
		this.kitchenCabinetFabric('7', 'Шкаф навесной низкий', '36×80×34', '2278'),
		this.kitchenCabinetFabric('8', 'Шкаф напольный', '82×40×53', '2405'),
		this.kitchenCabinetFabric('9', 'Шкаф напольный (2 ящика)', '82×40×53', '3884'),
		this.kitchenCabinetFabric('10', 'Шкаф напольный (3 ящика)', '82×40×53', '4325'),
		this.kitchenCabinetFabric('11', 'Шкаф напольный', '82×50×53', '2775'),
		this.kitchenCabinetFabric('12', 'Шкаф напольный', '82×60×53', '3248'),
		this.kitchenCabinetFabric('13', 'Шкаф напольный (1 ящик)', '82×60×53', '4060'),
		this.kitchenCabinetFabric('14', 'Шкаф напольный под духовку (1 ящик)', '82×60×53', '3189'),
		this.kitchenCabinetFabric('15', 'Шкаф напольный', '82×80×53', '3504'),
		this.kitchenCabinetFabric('16', 'Шкаф напольный угловой', '82×91×53', '4068'),
		this.kitchenCabinetFabric('17', 'Шкаф-пенал под духовку', '214×60×56', '5564'),
		this.kitchenCabinetFabric('18', 'Шкаф-пенал', '214×60×56', '7473')
	];

	public albums$: Observable<Album[]>;

	public albums: Album[] = [
		{
			id: 375686981,
			title: 'Кухонные шкафы',
			description: '',
			products: this.kitchenKabitents
		}
	];

	constructor(private productsOptionsService: ProductsOptionsService) {
		this.albums$ = this.fetchAlbums();
	}

	private fetchAlbums(): Observable<Album[]> {
		return of(this.albums);
	}

	private parseShortSize(shortSize: string): Size {
		const size: string[] = shortSize.split('×');
		return {
			height: +size[0],
			width: +size[1],
			depth: +size[2]
		};
	}

	private kitchenCabinetFabric(id: string, name: string, shortSize: string, price: string): Product {
		const commonUrl: string = `./assets/images/products/kitchen-cabinets/${id}.jpg`;
		const photoUrl: PhotoUrl = {
			low: commonUrl,
			high: commonUrl
		};
		const size: Size = this.parseShortSize(shortSize);
		const options: OptionAlbum[] =
			this.productsOptionsService.getOptionAlbumsByTypes([OptionType.Skin, OptionType.Facade]);
		return {
			id: parseInt(id, 10),
			name,
			size,
			price: parseInt(price, 10),
			photoUrl,
			options
		};
	}

	public getProductById(id: number): Product {
		let resultProduct: Product = null;
		this.albums.some((album: Album) => {
			resultProduct = album.products.find((product: Product) => product.id === id);
			return Boolean(resultProduct);
		});
		return resultProduct;
	}
}
