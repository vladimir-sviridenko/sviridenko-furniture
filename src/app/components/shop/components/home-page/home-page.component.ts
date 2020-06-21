import { Component } from '@angular/core';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { Feature } from '@shop/models/feature';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

	public slogan: string = 'Мебель любой сложности';
	public location: string = 'Москва и Московская область';

	public features: Feature[] = [
		{
			icon: 'api',
			title: 'Любая сложность',
			description: `Кухни, шкафы-купе, комоды,
			столы, полки, гардеробные, зеркала, межкомнатные двери...
			Сделаем всё, что угдоно вашей душе :) На нашем сайте вы можете
			ознакомится с нашими работами, а так же купить кухонные ящики онлайн.`
		},
		{
			icon: 'verified',
			title: 'Высокое качество',
			description: `Наши партнёры поставляют нам
			высококачественную продукцию.	А главный сборщик знает своё дело.
			Вы получите высокое качество как комплектующих так и сборки,
			по приемлимой цене.`
		},
		{
			icon: 'info',
			title: 'Бесплатный замер',
			description: `Вам бесплатно предоставляется замер.
			В замер входит полная консультация о будущей постройке,
			устанавливается стоймость, выбор цвета покрытия из
			большого набора образцов от наших партнёров.`
		}
	];

  constructor(private shopFacadeService: ShopFacadeService) {
		this.shopFacadeService.changePageTitle('Sviridenko Furniture');
	}
}
