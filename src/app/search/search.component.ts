import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'search',
  encapsulation: ViewEncapsulation.None,
    template: `<router-outlet></router-outlet>`,
  //template: require('./search.html'),
  styles: [require('./search.scss')]
})

export class Search {
  constructor() {
  }
}
