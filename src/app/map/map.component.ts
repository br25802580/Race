import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'map',
  encapsulation: ViewEncapsulation.None,
  template: require('./map.html'),
  styles: [require('./map.scss')]
})

export class Map {
  constructor() {
  }
}
