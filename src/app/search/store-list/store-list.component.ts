import {Component, ViewEncapsulation} from '@angular/core';
import {StoreListService} from './store-list.service';

@Component({
  selector: 'store-list',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./store-list.scss')],
  template: require('./store-list.html')
})
export class StoreListComponent {

  public feed:Array<Object>;

  constructor(private storeListService:StoreListService) {
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.feed = this.storeListService.getData();
  }
}
