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
import { IonicStorageModule } from '@ionic/storage';


import { IonPullupModule } from 'ionic-pullup';


import { SalesServiceProvider } from '../providers/sales-service/sales-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { CreateWhaleSalePage } from '../pages/create-whale-sale/create-whale-sale';
import { IntroSlidePage } from '../pages/intro-slide/intro-slide';
import { FooterComponent } from '../components/footer/footer';
import { EditWhaleSalePage } from '../pages/edit-whale-sale/edit-whale-sale';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapComponent,
    SaleCardsComponent,
    CreateWhaleSalePage,
    FooterComponent,
    IntroSlidePage,
    EditWhaleSalePage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: '' }),
    IonicStorageModule.forRoot(),
    IonPullupModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateWhaleSalePage,
    IntroSlidePage,
    EditWhaleSalePage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    SalesServiceProvider,
    UserServiceProvider
  ]

})
export class AppModule {}
