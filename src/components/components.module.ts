import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { SaleCardsComponent } from './sale-cards/sale-cards';
import { FooterComponent } from './footer/footer';
@NgModule({
	declarations: [MapComponent,
    SaleCardsComponent,
    FooterComponent],
	imports: [],
	exports: [MapComponent,
    SaleCardsComponent,
    FooterComponent]
})
export class ComponentsModule {}
