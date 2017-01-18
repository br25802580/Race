/// <reference path="../../../typings/googlemaps/google.maps.d.ts" />
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'map',
  encapsulation: ViewEncapsulation.None,
  template: require('./map.html'),
  styles: [require('./map.scss')]
})

export class Map {
  point: Point;
  address: string;

  constructor() {
    this.point = { lat: 32.116549, lng: 34.8405267 }; //This line is temp
    navigator.geolocation.getCurrentPosition(position => {
      this.point = { lat: position.coords.latitude, lng: position.coords.longitude }
    });
  }

  calculateAddress(point: Point) {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(point.lat, point.lng);
    let request = {
      latLng: latlng
    };
    var self = this;

    geocoder.geocode(request, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
          self.address = results[0].formatted_address;

        }
      }
    });
  }

  getRadius(x) {
    return x * Math.PI / 180;
  }

  calculateDistance(p1: Point, p2: Point) {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = this.getRadius(p2.lat - p1.lat);
    let dLong = this.getRadius(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.getRadius(p1.lat)) * Math.cos(this.getRadius(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c / 1000; //distance in km
  }

  distanceFormat(distance: number) {
    let km = Math.round(distance)
    let meters = Math.round(distance * 1000) % 1000
    return (km > 0 ? km + ' KM, ' : '') + meters + (meters == 1 ? ' meter' : ' meters');
  }
}
export class Point {
  lat: number;
  lng: number;
}
