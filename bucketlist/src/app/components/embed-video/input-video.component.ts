import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-video',
  templateUrl: './input-video.component.html',
  styleUrls: ['./input-video.component.less']
})
export class InputVideoComponent implements OnInit {
  @Input() array: any[];
  @Input() key: any;
  @Input() link: any;
  @Input() limit: number;
  
  constructor() {}

  ngOnInit() {

  }


  removeItem(){
    if(this.array[this.array.length - 1]){
      this.array[this.array.length] = '';
    }
    this.array[this.key] = '';

    if((this.key === 0 && this.array.length > 1) || this.key!= 0){
      this.array.splice(this.key, 1);
    }
  };

  changeLink(){
    if(this.array[this.key] === ''){
      this.removeItem();
    }
    else {
      if(!this.array[this.key + 1] && this.array.length < this.limit){
        setTimeout(()=>{
          this.array.push('');
        }, 100)
      }
    }
  }
  isVideoLink(url){
    return !(!url || url.indexOf("https:/") == -1);
  };
}