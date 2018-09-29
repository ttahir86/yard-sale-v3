import { ModalController } from 'ionic-angular';
import { WhalesalePage } from './../../pages/whalesale/whalesale';
import { SaleCardsComponent } from './../sale-cards/sale-cards';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMap, Marker, MarkerOptions, MapOptions, InfoWindow, Polyline } from "@agm/core/services/google-maps-types";
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ISale } from '../../providers/sales-service/sales.model';
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {
 
  public customStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "hue": "#ff4400"
        },
        {
          "saturation": -100
        },
        {
          "lightness": -4
        },
        {
          "gamma": 0.72
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon"
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
        {
          "hue": "#0077ff"
        },
        {
          "gamma": 3.1
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "hue": "#00ccff"
        },
        {
          "gamma": 0.44
        },
        {
          "saturation": -33
        }
      ]
    },
    {
      "featureType": "poi.park",
      "stylers": [
        {
          "hue": "#44ff00"
        },
        {
          "saturation": -23
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "hue": "#007fff"
        },
        {
          "gamma": 0.77
        },
        {
          "saturation": 65
        },
        {
          "lightness": 99
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "gamma": 0.11
        },
        {
          "weight": 5.6
        },
        {
          "saturation": 99
        },
        {
          "hue": "#0091ff"
        },
        {
          "lightness": -86
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "lightness": -48
        },
        {
          "hue": "#ff5e00"
        },
        {
          "gamma": 1.2
        },
        {
          "saturation": -23
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "saturation": -64
        },
        {
          "hue": "#ff9100"
        },
        {
          "lightness": 16
        },
        {
          "gamma": 0.47
        },
        {
          "weight": 2.7
        }
      ]
    }
  ];

  
  nightTimeStyles = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ]


  public dayTimeStyles = [
    {
      "elementType": "geometry",
      "stylers": [
     
        {
          "color": "#f3ffe2"
        },
        {
          "contrast": 100
        }
      
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon"
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
        {
          "color" : "#222"
        },
       
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "color": "#9bd5ff"
        },
        {
          "gamma" : 1.1
        }
      
      ]
    },

    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3f6093"
        }
        
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        { 
          "color": "#3f6093"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
       {
         "color" : "#222"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        { 
          "color": "#222" 
        }
      ]
    }
  ];

  @Input() mapCenter: {lat: number, lng: number};
  @Input() sales: {title: string, distance: number, lat: number, lng: number}[];
  @Input() usersale: ISale[] = [{owner: '', title: '', description: '', distance: 0.0, lat: 0, lng: 0}];
  @Input() circleRadius: number;
  @Input() loadMarkerSet: boolean;
  @Output() onLoadMapEvent: EventEmitter<any> = new EventEmitter<any>();
  gmap: GoogleMapsAPIWrapper;
  radius: number;
  icons: any =
    
      {  
        url: './assets/imgs/yard-sale-pin.gif',
        scaledSize: {
        height: 40,
        width: 40},
      }

      iconuser: any =
    
      {  
        url: './assets/imgs/yard-sale-pin.gif',
        scaledSize: {
        height: 45,
        width: 45},
      }

      iconWhale: any =
    
      {  
        url: './assets/imgs/sale-sign.png',
        scaledSize: {
        height: 40,
        width: 40},
      }
      
      

  
  constructor(private modalCtrl: ModalController) {
    console.log('Hello MapComponent Component');
  }



  ngOnInit() {
    this.radius = (1609.34 * this.circleRadius)
    console.log('USERSALE IN MAP.TS')
    console.log(this.usersale)
    console.log(this.sales)

   
  }
  protected onMapReady(map:GoogleMapsAPIWrapper) {
    this.gmap = map;
    this.onLoadMapEvent.emit(this);
  }


  public centerMap(sale: ISale) {
    if (this.gmap)
      this.gmap.panTo({ lat: sale.lat, lng: sale.lng });
  }

  public center(loc: {lng: number, lat: number}){
    if (this.gmap)
      this.gmap.panTo({ lat: loc.lat, lng: loc.lng });
  }

  openWhaleSalePage(sale: ISale){
    let modalPage = this.modalCtrl.create(WhalesalePage, { sale: sale });

    modalPage.present();
  }



}
