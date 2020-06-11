import { UserContacts } from './user-contacts';

export class HTMLGenerator {

	private containerStyle: string = 'padding:12px 15px;background:#f5f5f5;font-size:14px;color:#333';

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

	private getTargetPhotoHtml(url: string): HTMLImageElement {
		const photo: HTMLImageElement = document.createElement('img');
		photo.src = url;
		photo.height = parseInt('250', 10);
		photo.alt = 'Интересующий продукт';
		return photo;
	}

	public getErrorHtml(error: Error): HTMLElement {
		const errorContent: Map<string, string> = new Map([
			['Name: ', error.name],
			['Mesage: ', error.message],
			['Stack: ', error.stack]
		]);

		return this.getTwoColumnsTableHtml(errorContent);
	}

	public getRequestCallHtml(user: UserContacts, targetPhotoUrl: string): HTMLElement {
		const container: HTMLDivElement = document.createElement('div');
		container.setAttribute('style', this.containerStyle);

		const title: string = '<p>Потенциальный клиент <strong>запросил звонок!</strong></p>';

		const contactsContent: Map<string, string> = new Map([
			['Имя: ', user.name],
			['Телефон: ', user.phone],
			['Email: ', user.email]
		]);
		const contactsTableHtml: HTMLTableElement = this.getTwoColumnsTableHtml(contactsContent);
		const userPhone: string = contactsTableHtml.rows[1].cells[1].innerHTML;
		contactsTableHtml.rows[1].cells[1].innerHTML = `<a href="tel:${userPhone}">${userPhone}</a>`;
		const contactsTable: string = contactsTableHtml.outerHTML;

		const targetPhoto: string = this.getTargetPhotoHtml(targetPhotoUrl).outerHTML;
		const targetPhotoLabel: string = '<figcaption>Интересующий продукт:</figcaption>';
		const targetPhotoContainer: string =
				`<figure style="margin: 0; margin-top: 10px">${targetPhotoLabel}${targetPhoto}</figure>`;

		container.innerHTML = title + contactsTable + targetPhotoContainer;
		return container;
	}
}
