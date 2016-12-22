import {Component, ViewEncapsulation} from '@angular/core';
import {AgentListService} from './agent-list.service';

@Component({
  selector: 'agent-list',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./agent-list.scss')],
  template: require('./agent-list.html')
})
export class AgentListComponent {

  public feed:Array<Object>;

  constructor(private agentListService:AgentListService) {
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.feed = this.agentListService.getData();
  }
}
