import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild("tooltip") public tooltipElementRef: ElementRef;
  public hoveredText:string;
  public isHover:boolean;
  constructor(public renderer: Renderer) { }

  ngOnInit() {
  }

  hideJoin(event){
    if(event && event.val){
      this.hoveredText = event.val;
      this.isHover = true;
      let left = +event.ev.pageX - 60;
      let top  = event.ev.pageY - 60;
      this.renderer.setElementStyle(this.tooltipElementRef.nativeElement, 'left', left + 'px');
      this.renderer.setElementStyle(this.tooltipElementRef.nativeElement, 'top', top + 'px');

    } else {
      this.hoveredText = '';
      this.isHover = false
    }

  }
}
