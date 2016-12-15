import { Component, OnInit, Input } from '@angular/core';
import {User} from "../../interface/user";

@Component({
  selector: 'goal-friend',
  templateUrl: './goal-friend.component.html',
  styleUrls: ['./goal-friend.component.less']
})
export class GoalFriendComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
