import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'appointments',
  encapsulation: ViewEncapsulation.None,
    template: `<router-outlet></router-outlet>`,
  //template: require('./appointments.html'),
  styles: [require('./appointments.scss')]
})

export class Appointments {
  constructor() {
  }
}
