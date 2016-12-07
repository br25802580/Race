import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.None,
  template: require('./home.html'),
  styles: [require('./home.scss')]
})

export class Home {
  constructor() {
  }
}
