import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'calendar-all-year',
  templateUrl: './calendar-all-year.component.html',
  styleUrls: ['./calendar-all-year.component.less']
})
export class CalendarAllYearComponent implements OnInit {
  public colArray: number[] = [0,1,2,3,4,5,6,7,8,9,10,11];
  @Input() currentYear: any;
  @Input() myYears: number;
  constructor() {
  }

  ngOnInit() {
      }

}
