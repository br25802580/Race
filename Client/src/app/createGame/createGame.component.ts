import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule, LatLngLiteral, LatLngBounds, SebmGoogleMap } from 'angular2-google-maps/core';
//import { AgmCoreModule } from 'angular2-google-maps/core';
import { NoOpMapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import { GameData, gameData } from '../../data/game_data';
import * as mapTypes from 'angular2-google-maps/services/google-maps-types';
import { MapsAPILoader } from 'angular2-google-maps/core/services/maps-api-loader/maps-api-loader';



@Component({
  selector: 'createGame',
  styleUrls: ['create-game.scss'],
  templateUrl: 'createGame.html',
  encapsulation: ViewEncapsulation.None
})

export class CreateGameComponent implements OnInit {
  @Output() startGame: EventEmitter<Object> = new EventEmitter<Object>();
  gameData: GameData = gameData;
  tempData: GameData = new GameData();
  selectedColor: string;
  selectedLevel: number;
  selectedNumPlayers: string;
  lat: number = 32.1165508;
  lng: number = 34.8427702;
  zoom: number = 8;
  public oneAtATime: boolean = true;
  public status: Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  constructor(private _loader: MapsAPILoader) {
    this.tempData.route = {
      source: 'הדף היומי 6 תל אביב',
      destination: 'הצנחנים 22 תל אביב',
      destPoint: { lat: 32.1167004, lng: 34.84040849999997 },
    sourcePoint: { lat: 32.115633, lng: 34.84027600000002 }
    };
  }

  ngOnInit() {
  }

  start() {
    this.startGame.emit({ sourceStr: this.tempData.route.source, destinationStr: this.tempData.route.destination });
  }

  setSelectedColor(selectedColor: string) {
    this.tempData.carColor = selectedColor;
    document.getElementById("labelColor").style.backgroundColor = selectedColor;
  }

  setSelectedLevel(selectedLevel: number) {
    this.tempData.level = selectedLevel;
  }

  setSelectednNumPlayers(selectedNumPlayers: number) {
    this.tempData.numPlayers = selectedNumPlayers;
  }

  saveGameData() {
    this._loader.load().then(() => {
      this.getPointByAddress(this.tempData.route.source, 'tempData.route.sourcePoint', () => {
        this.getPointByAddress(this.tempData.route.destination, "tempData.route.destPoint", () => {
          this.GetRoute(() => {
            this.validateRoute();
          });
        })
      });

    });

  }

  validateRoute() {
    this.gameData.setData(this.tempData);    
    console.log("validation success");
    window.location.href = "http://localhost:4000/#/gameBoard";
  }

  GetRoute(callback) {
    let directionsService = new google.maps.DirectionsService();
    let start = new google.maps.LatLng(this.gameData.route.sourcePoint.lat, this.gameData.route.sourcePoint.lng);
    let end = new google.maps.LatLng(this.gameData.route.destPoint.lat, this.gameData.route.destPoint.lng);
    let request = {
      origin: start,
      destination: end,
      provideRouteAlternatives: true,
      travelMode: google.maps.TravelMode['DRIVING'],
    };
    directionsService.route(request, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK && response.routes[0].overview_path.length>0) {
        callback()
      }
      else
        alert("google not find route between this places");
    });
  }

  getPointByAddress(address: string, varName: string, callback: any) {
    const myCallback = callback.bind(this);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let response = results[0].geometry.location;
        this[varName] = {
          lat: response.lat(),
          lng: response.lng()
        }
        if (varName =="tempData.route.sourcePoint")
        this.tempData.route.sourcePoint = {
          lat: response.lat(),
          lng: response.lng()
        }
        if (varName =="tempData.route.destPoint")
        this.tempData.route.destPoint = {
          lat: response.lat(),
          lng: response.lng()
        }
        myCallback();
      }
      else {
        console.log(varName, 'faild');
        alert(varName + " not found choose other address");
      }

    });
  }
}





