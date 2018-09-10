import { SaleCardsComponent } from './../components/sale-cards/sale-cards';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

// my components
import { MapComponent } from '../components/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { SalesServiceProvider } from '../providers/sales-service/sales-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapComponent,
    SaleCardsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDZGWzxjVpZN_eSlRXSoh-iVY_6tAp15uk' }),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    SalesServiceProvider
  ]
})
export class AppModule {}
