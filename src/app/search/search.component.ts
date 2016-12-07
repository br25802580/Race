import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'search',
  encapsulation: ViewEncapsulation.None,
  template: require('./search.html'),
  styles: [require('./search.scss')]
})

export class Search {
  constructor() {
  }
}
