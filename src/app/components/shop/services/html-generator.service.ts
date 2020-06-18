import { UserContacts } from '@shop/models/user-contacts';
import { Cart } from '@shop/models/cart';
import { ProductPool } from '@shop/models/product-pool';
import { CartProduct } from '@shop/models/cart-product';
import { SelectedOption } from '@shop/models/selected-option';
import { Option } from '@shop/models/option';
import { Injectable } from '@angular/core';

@Injectable()
export class HTMLGeneratorService {

	private containerStyle: string = 'padding:12px 15px;background:#f5f5f5;font-size:14px;color:#333';
	private baseHref: string = 'https://vladimir-sviridenko.github.io/sviridenko-furniture/';

	private getTwoColumnsTableHtml(tableContent: Map<string, string>): HTMLTableElement {
		const table: HTMLTableElement = document.createElement('table');
		table.style.borderCollapse = 'collapse';
		table.setAttribute('border', '1');
		const tableBody: HTMLTableSectionElement = table.createTBody();
		tableContent.forEach((content: string, title: string) => {
			tableBody.innerHTML += `
			<tr style='vertical-align: top;'>
				<td style='white-space: nowrap;'>${title}</td>
				<td style='white-space: pre-wrap;'>${content}</td>
			</tr>`;
		});
		return table;
	}

	private getTargetPhotoHtml(url: string): HTMLDivElement {
		const photoContainer: HTMLDivElement = document.createElement('div');
		const photoLabel: string = '<div style="margin-top:10px">Интересующий продукт:</div>';
		const photo: HTMLImageElement = document.createElement('img');
		photo.src = url;
		photo.height = parseInt('250', 10);
		photo.alt = 'Интересующий продукт';
		photoContainer.innerHTML = photoLabel + photo.outerHTML;
		return photoContainer;
	}

	private getProductDescriptionHtml(cartProduct: CartProduct): HTMLTableElement {
		const tableContent: Map<string, string> = new Map([
			['Название: ', cartProduct.product.name],
			['Высота: ', cartProduct.product.size.height.toString()],
			['Ширина: ', cartProduct.product.size.width.toString()],
			['Глубина: ', cartProduct.product.size.depth.toString()]
		]);
		cartProduct.selectedOptions.forEach((selectedOption: SelectedOption) => {
			const option: Option = selectedOption.option;
			const optionDescription: string = `<div>${option.id} ${option.name} К${option.category}</div>`;
			tableContent.set(`${selectedOption.type}: `, optionDescription);
		});
		const descriptionTableHtml: HTMLTableElement = this.getTwoColumnsTableHtml(tableContent);
		descriptionTableHtml.removeAttribute('border');

		return descriptionTableHtml;
	}

	private getOrderHtml(cart: Cart): HTMLDivElement {
		const orderContainer: HTMLDivElement = document.createElement('div');
		orderContainer.innerHTML = '<div style="margin-top:10px">Заказ:</div>';
		const orderContent: Map<string, string> = new Map();

		// create main columns
		cart.pools.forEach((pool: ProductPool, index: number) => {
			const photoUrl: string = this.baseHref + pool.cartProduct.product.photoUrl.low.slice(1);
			const productPhoto: string = `<img height="90" src="${photoUrl}" alt="Фото продукта">`;
			const itemIndex: string = `<span style="font-size: 0;">${index + 1}</span>`;
			const productDescriptin: string = this.getProductDescriptionHtml(pool.cartProduct).outerHTML;
			orderContent.set(productPhoto + itemIndex, productDescriptin);
		});

		// create first and last table columns
		const orderTableHtml: HTMLTableElement = this.getTwoColumnsTableHtml(orderContent);
		cart.pools.forEach((pool: ProductPool, index: number) => {
			const numberCell: HTMLTableCellElement = orderTableHtml.rows[index].insertCell(0);
			numberCell.innerHTML = (index + 1).toString();
			numberCell.setAttribute('style', 'text-align: center');
			const priceCell: HTMLTableCellElement = orderTableHtml.rows[index].insertCell(Number('3'));
			priceCell.setAttribute('style', 'text-align: right; vertical-align: bottom;');
			priceCell.innerHTML = `<div>${pool.quantity} x ${pool.cartProduct.totalPrice}</div>`;
		});
		orderTableHtml.setAttribute('style', 'background-color: white;');

		// create column descriptions
		orderTableHtml.insertRow(0).innerHTML = `
		<td>№</td>
		<td>Фото</td>
		<td>Описание</td>
		<td>Цена RUB</td>`;

		orderTableHtml.innerHTML += `
		<tr>
			<td style="text-align: center;">#</td>
			<td colspan="2" style="text-align: right;">Итого к оплате: </td>
			<td style="text-align: right;">${cart.totalPrice} RUB</td>
		</tr>`;

		orderContainer.innerHTML += orderTableHtml.outerHTML;
		return orderContainer;
	}

	private getUserContactsHtml(user: UserContacts): HTMLElement {
		const contactsContent: Map<string, string> = new Map([
			['Имя: ', user.name],
			['Телефон: ', user.phone],
			['Email: ', user.email]
		]);
		const contactsTableHtml: HTMLTableElement = this.getTwoColumnsTableHtml(contactsContent);
		const userPhone: string = contactsTableHtml.rows[1].cells[1].innerHTML;
		contactsTableHtml.rows[1].cells[1].innerHTML = `<a href="tel:${userPhone}">${userPhone}</a>`;
		return contactsTableHtml;
	}

	public getErrorHtml(error: Error): HTMLElement {
		const errorContent: Map<string, string> = new Map([
			['Name: ', error.name],
			['Mesage: ', error.message],
			['Stack: ', error.stack]
		]);

		return this.getTwoColumnsTableHtml(errorContent);
	}

	public getOrderConfirmationMessageHtml(cart: Cart): HTMLDivElement {
		const container: HTMLDivElement = document.createElement('div');
		container.setAttribute('style', this.containerStyle);
		const title: string = '<p>Спасибо за заказ. Ожидайте звонка.</p>';
		const order: string = this.getOrderHtml(cart).outerHTML;

		container.innerHTML = title + order;
		return container;
	}

	public getRequestCallMessageHtml(user: UserContacts, targetPhotoUrl: string): HTMLDivElement {
		const container: HTMLDivElement = document.createElement('div');
		container.setAttribute('style', this.containerStyle);
		const title: string = '<p>Потенциальный клиент <strong>запросил звонок!</strong></p>';
		const contactsTable: string = this.getUserContactsHtml(user).outerHTML;
		const targetPhoto: string = this.getTargetPhotoHtml(targetPhotoUrl).outerHTML;
		container.innerHTML = title + contactsTable + targetPhoto;
		return container;
	}

	public getOrderMessageHtml(user: UserContacts, cart: Cart): HTMLDivElement {
		const container: HTMLDivElement = document.createElement('div');
		container.setAttribute('style', this.containerStyle);

		const contactsTable: string = this.getUserContactsHtml(user).outerHTML;
		const order: string = this.getOrderHtml(cart).outerHTML;
		container.innerHTML = contactsTable + order;
		return container;
	}
}
