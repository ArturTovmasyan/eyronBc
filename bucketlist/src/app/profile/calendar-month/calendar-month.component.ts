import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.less']
})
export class CalendarMonthComponent implements OnInit {
  public trArray: number[] = [0,1,2,3,4,5]; 
  public tdArray: number[] = [0,1,2,3,4,5,6];
  @Input() myDays: any;
  @Input() days: any;
  constructor() { }

  ngOnInit() {}

}
