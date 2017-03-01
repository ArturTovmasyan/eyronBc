import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
  selector: 'share-modal',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ShareComponent implements OnInit {

  public linkToShare:string;
  fbInner = "<img src='../../assets/images/facebook-share.svg'>";
  twitterInner = "<img src='../../assets/images/twitter-share.svg'>";
  pintInner = "<img src='../../assets/images/pinterest-share.svg'>";
  inInner = "<img src='../../assets/images/linkedin-share.svg'>";
  googleInner = "<img src='../../assets/images/google-plus-share.svg'>";
  constructor(
      public dialogRef: MdDialogRef<ShareComponent>
  ) {}

  ngOnInit() {};

}

  
  