import { Component, OnInit, Input } from '@angular/core';
import { Broadcaster } from '../../tools/broadcaster';

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.less']
})
export class LightboxComponent implements OnInit {
  @Input() data: any;
  public img_path: any;

  public config: any = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoHeight: true,
    // loop: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    autoplay: 3000
  };

  constructor(private broadcaster: Broadcaster) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data.length == 1){
      for (let i of this.data){
        console.log(i.image_path);
        this.img_path = i.image_path
      }
    }
  }
  closeLightBox(){
    this.broadcaster.broadcast('closeLightbox');
  }
}
