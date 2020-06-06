import { Pipe, PipeTransform } from '@angular/core';
import { Size } from '@shop/models/Size';

@Pipe({
	name: 'size'
})
export class SizePipe implements PipeTransform {

	public transform(value: Size, ...args: string[]): string {
		return `${value.height}×${value.width}×${value.depth}`;
	}
}
