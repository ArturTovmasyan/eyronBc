import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'calendar-year',
  templateUrl: './calendar-year.component.html',
  styleUrls: ['./calendar-year.component.less']
})
export class CalendarYearComponent implements OnInit {
  public colArray: number[] = [0,1];
  public trArray: number[] = [0,1,2,3];
  public tdArray: number[] = [0,1,2];
  @Input() myYAMonths: any;
  @Input() currentYear: number;
  constructor() { }

  ngOnInit() {
  }

  dateByFormat(year, month, day) {
    return new Date(year, month, day);
    // moment(year + '-' +((month > 9)?month:'0'+month)+'-'+((day > 9)?day:'0'+day));
    // return format?date.format(format):date;
  };
}
