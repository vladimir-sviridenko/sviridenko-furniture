import { Component, AfterViewInit, ViewChild, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { Album } from '@shop/models/album';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { take, filter, delay, takeUntil, map } from 'rxjs/operators';
import { Product } from '@shop/models/product';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnDestroy {

	public pageSize: number = 12;
	public productsFullList: Product[] = [];

	public pageIndexes: number[] = [];

	public currentPageIndex: number = null;

	public unsubscriber$: Subject<void> = new Subject();

	constructor(public shopFacadeService: ShopFacadeService, public router: ActivatedRoute) { }

	private initPaginatorButtons(): void {
		const pagesQuantity: number = Math.ceil(this.productsFullList.length / this.pageSize);
		this.pageIndexes = [...Array(pagesQuantity).keys()];
	}

	public ngOnInit(): void {
		this.shopFacadeService.currentAlbum$
			.pipe(
				filter((album: Album) => Boolean(album)),
				takeUntil(this.unsubscriber$)
			)
			.subscribe((currentAlbum: Album) => {
				this.productsFullList = currentAlbum.products;
				this.router.queryParams.subscribe((queryParams: Params) => {
					this.currentPageIndex = null;
					const pageIndex: number = queryParams['page'] ? (parseInt(queryParams['page'], 10) - 1) : 0;
					this.goToPage(pageIndex);
				});
			});
	}

	public goToPage(pageIndex: number): void {
		this.currentPageIndex = pageIndex;
		const firstProductIndex: number = pageIndex * this.pageSize;
		const lastProductIndex: number = firstProductIndex + this.pageSize;
		const paginatedProducts: Product[] = this.productsFullList.slice(firstProductIndex, lastProductIndex);
		this.initPaginatorButtons();
		this.shopFacadeService.changeCurrentProducts(paginatedProducts);
	}

	public ngOnDestroy(): void {
		this.unsubscriber$.next();
		this.unsubscriber$.complete();
	}
}
