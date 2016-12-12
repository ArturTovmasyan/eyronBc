import { Component, OnInit } from '@angular/core';


import { DiscoverGoalComponent } from '../components/discover-goal/discover-goal.component';
import { BaseStoriesComponent } from '../components/base-stories/base-stories.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
