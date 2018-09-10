import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { SaleCardsComponent } from './sale-cards/sale-cards';
@NgModule({
	declarations: [MapComponent,
    SaleCardsComponent],
	imports: [],
	exports: [MapComponent,
    SaleCardsComponent]
})
export class ComponentsModule {}
