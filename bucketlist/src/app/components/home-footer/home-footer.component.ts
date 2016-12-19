import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.less']
})

export class HomeFooterComponent implements OnChanges {
  @Input() privacyMenu;
  url:string;
  name:string;

  constructor() { }

  ngOnChanges() {
    if(this.privacyMenu && this.privacyMenu.isTerm){
      this.url = this.privacyMenu.url;
      this.name = this.privacyMenu.name;
    }
  }

}
