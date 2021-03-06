import { Component } from '@angular/core';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';
import { Feature } from '@shop/models/feature';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

	public isBackgroundLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public slogan: string = 'Мебель любой сложности';
	public location: string = 'Москва и Московская область';

	public features: Feature[] = [
		{
			icon: 'api',
			title: 'Любая сложность',
			description: `Кухни, шкафы-купе, комоды,
			столы, полки, гардеробные, зеркала, межкомнатные двери...
			Сделаем всё, что угдоно вашей душе :) На нашем сайте вы можете
			ознакомиться с нашими работами, а также купить кухонные ящики онлайн.`
		},
		{
			icon: 'verified',
			title: 'Высокое качество',
			description: `Наши партнёры поставляют нам
			высококачественную продукцию.	А главный сборщик знает своё дело.
			Вы получите высокое качество как комплектующих, так и сборки,
			по приемлемой цене.`
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

	get onTabletResize$(): Observable<BreakpointState> {
		return this.breakpointObserver.observe([
			'(min-width: 1000px)',
		]);
	}

	constructor(private productsTableFacadeService: ProductsTableFacadeService,
		private breakpointObserver: BreakpointObserver) {
		this.productsTableFacadeService.changePageTitle('Sviridenko Furniture');
	}
}
