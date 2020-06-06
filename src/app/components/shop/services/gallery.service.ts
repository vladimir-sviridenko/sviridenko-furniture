import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';

import { VkAlbum } from '@shop/models/VkAlbum';
import { VkRequest } from '@shop/models/VkRequest';
import { VkResponse } from '@shop/models/VkResponse';
import { Product } from '@shop/models/Product';
import { VkPhoto } from '@shop/models/VkPhoto';

import { VkPhotoQuality } from '@shop/models/enums/VkPhotoQuality.enum';
import { VkPhotoSize } from '@shop/models/VkPhotoSize';
import { Album } from '@shop/models/Album';
import { PhotoUrl } from '@shop/models/PhotoUrl';

@Injectable()
export class GalleryService {

	private baseUrl: string = 'https://api.vk.com/method/';
	private ownerId: number = -184311662;
	private accessToken: string = '797c1fca797c1fca797c1fca1e790dc5257797c797c1fca27c62cecb8dcd6ce6f9cf236';
	private apiVersion: number = 5.103;

	public vkAlbums: VkAlbum[];

	public productAlbums$: Observable<Album[]>;

	private get emptyVkResponse(): VkResponse<any> {
		const emptyVkResponse: VkResponse<any> = {
			response: {
				count: 0,
				items: []
			}
		};
		return emptyVkResponse;
	}

	constructor(private http: HttpClient) {
		this.productAlbums$ = this.fetchAlbums();
	}

	private getProductPhotoUrl(photo: VkPhoto): PhotoUrl {
		function getVkPhotoSize(sizeType: VkPhotoQuality): VkPhotoSize {
			return photo.sizes.find((size: VkPhotoSize) => size.type === sizeType);
		}

		const photoLowSize: VkPhotoSize = (photo.sizes[0].width > photo.sizes[0].height)
			? getVkPhotoSize(VkPhotoQuality.Medium)
			: getVkPhotoSize(VkPhotoQuality.Low);

		const photoUrl: PhotoUrl = {
			low: photoLowSize.url,
			high: getVkPhotoSize(VkPhotoQuality.Large).url,
		};

		return photoUrl;
	}

	private generateVkRequestUrl(method: string, params: VkRequest): string {
		let url: string = `${this.baseUrl}${method}?`;
		for (const [key, value] of Object.entries(params)) {
			url += `${key}=${value}&`;
		}
		return url;
	}

	private fetchPhotosInto(album: VkAlbum): Observable<VkAlbum> {
		const url: string = this.generateVkRequestUrl('photos.get', {
			owner_id: this.ownerId,
			album_id: album.id,
			access_token: this.accessToken,
			v: this.apiVersion
		});

		return this.http.jsonp(url, 'callback').pipe(
			catchError((): Observable<VkResponse<VkPhoto[]>> => of(this.emptyVkResponse)),
			map((vkResponse: VkResponse<VkPhoto[]>) => vkResponse.response.items),
			map((photos: VkPhoto[]) => {
				photos.forEach((photo: VkPhoto) => {
					album.photos.push({
						id: photo.id,
						sizes: photo.sizes,
						text: photo.text
					});
				});
				return album;
			}),
		);
	}

	public getProductsFrom(album: VkAlbum): Product[] {
		return album.photos.map((photo: VkPhoto) => {
			const productCard: Product = {
				id: photo.id,
				name: Boolean(photo.text) ? photo.text : '',
				size: null,
				price: null,
				photoUrl: this.getProductPhotoUrl(photo),
				options: [],
				selectedOptions: []
			};
			return productCard;
		});
	}

	public fetchAlbums(): Observable<Album[]> {
		const url: string = this.generateVkRequestUrl('photos.getAlbums', {
			owner_id: this.ownerId,
			access_token: this.accessToken,
			v: this.apiVersion
		});

		return this.http.jsonp(url, 'callback').pipe(
			catchError((): Observable<VkResponse<VkAlbum[]>> => of(this.emptyVkResponse)),
			map((vkResponse: VkResponse<VkAlbum[]>) => {
				const albums: VkAlbum[] = vkResponse.response.items;
				return albums.map((album: VkAlbum) => {
					album.photos = [];
					return album;
				});
			}),
			mergeMap((albums: VkAlbum[]) => {
				return (albums.length === 0) ? of([]) : forkJoin(albums.map((album: VkAlbum) => this.fetchPhotosInto(album)));
			}),
			tap((albums: VkAlbum[]) => this.vkAlbums = albums),
			map((albums: VkAlbum[]) => {
				const productAlbums: Album[] = [];
				albums.forEach((album: VkAlbum) => {
					productAlbums.push({
						id: album.id,
						title: album.title,
						description: album.description,
						products: this.getProductsFrom(album)
					});
				});
				return productAlbums;
			})
		);
	}
}
