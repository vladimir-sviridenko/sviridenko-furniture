import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CartFacadeService } from '@store/facades/cart.facade';
import { OptionType } from '@shop/models/enums/option-type.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

	public optionTypeEnum: typeof OptionType = OptionType;

	constructor(public cartFacadeService: CartFacadeService) {}
}
