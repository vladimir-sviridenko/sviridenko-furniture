import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
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
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterViewInit, OnDestroy {

	@ViewChild(MatPaginator)
	public paginator: MatPaginator;

	public pageIndexes$: Subject<number[]> = new Subject<number[]>();

	public currentPageIndex: number = null;

	public unsubscriber$: Subject<void> = new Subject();

	constructor(public shopFacadeService: ShopFacadeService, public router: ActivatedRoute) { }

	private initButtonsContents(): void {
		const pagesQuantity: number = Math.ceil(this.paginator.length / this.paginator.pageSize);
		const pageIndexes: number[] = [...Array(pagesQuantity).keys()];
		this.pageIndexes$.next(pageIndexes);
	}

	public ngAfterViewInit(): void {
		this.shopFacadeService.currentAlbum$
			.pipe(
				filter((album: Album) => Boolean(album)),
				delay(0),
				takeUntil(this.unsubscriber$)
			)
			.subscribe(() => {
				this.initButtonsContents();
				this.router.queryParams.subscribe((queryParams: Params) => {
					this.currentPageIndex = null;
					const page: number = queryParams['page'] ? (parseInt(queryParams['page'], 10) - 1) : 0;
					this.goToPage(page);
				});
			});
	}

	public goToPage(pageIndex: number): void {
		const firstPageEvent: PageEvent = new PageEvent();
		firstPageEvent.length = this.paginator.length;
		firstPageEvent.pageSize = this.paginator.pageSize;
		firstPageEvent.pageIndex = pageIndex;
		this.paginator.page.next(firstPageEvent);
	}

	public onPageEvent($event: PageEvent): void {
		if (this.currentPageIndex !== $event.pageIndex) {
			this.currentPageIndex = $event.pageIndex;
			this.shopFacadeService.currentAlbum$.pipe(filter((album: Album) => Boolean(album)), take(1)).subscribe((album: Album) => {
				const firstProductIndex: number = ($event.pageIndex) * ($event.pageSize);
				const lastProductIndex: number = firstProductIndex + $event.pageSize;
				const paginatedProducts: Product[] = album.products.slice(firstProductIndex, lastProductIndex);
				this.shopFacadeService.changeCurrentProducts(paginatedProducts);
			});
		}
	}

	public ngOnDestroy(): void {
		this.unsubscriber$.next();
		this.unsubscriber$.complete();
	}
}
