import { Component, OnInit, Input } from '@angular/core';
import { Broadcaster } from '../../tools/broadcaster';

import { Goal } from '../../interface/goal';
import { Story } from '../../interface/story';
@Component({
  selector: 'goal-users',
  templateUrl: './goal-users.component.html',
  styleUrls: ['./goal-users.component.less']
})
export class GoalUsersComponent implements OnInit {
  @Input() goal: Goal;
  @Input() story: Story;
  @Input() type: number;
  constructor(private broadcaster: Broadcaster) { }

  ngOnInit() {
  }


  openUsersModal(id:number, count:number, category: number){
    if(!localStorage.getItem('apiKey')){
      this.broadcaster.broadcast('openLogin', 'some message');
    } else {
      this.broadcaster.broadcast('usersModal', {itemId: id, count: count, category: category});
    }

  }
}
