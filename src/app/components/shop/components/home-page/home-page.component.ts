import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { Feature } from '@shop/models/feature';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit, OnDestroy {

	@ViewChild('backgroundImage')
	private backgroundImage: ElementRef;

	private unsubscriber$: Subject<void> = new Subject<void>();

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

	get tabletLayoutChange$(): Observable<BreakpointState> {
		return this.breakpointObserver.observe([
			'(min-width: 1000px)',
		]);
	}

	constructor(private shopFacadeService: ShopFacadeService,
		private breakpointObserver: BreakpointObserver) {
		this.shopFacadeService.changePageTitle('Sviridenko Furniture');
	}

	public ngAfterViewInit(): void {
		this.tabletLayoutChange$
			.pipe(
				takeUntil(this.unsubscriber$)
			)
			.subscribe((breakpointState: BreakpointState) => {
				const background: HTMLImageElement = this.backgroundImage.nativeElement as HTMLImageElement;
				const src: string = background.dataset.src;
				const srcMobile: string = background.dataset.srcMobile;
				const selectedSrc: string = breakpointState.matches ? src : srcMobile;
				background.setAttribute('src', selectedSrc);
			});
	}

	public ngOnDestroy(): void {
		this.unsubscriber$.next();
		this.unsubscriber$.complete();
	}

}
