import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {

  public lsText: string;
  constructor(public dialogRef: MdDialogRef<ConfirmComponent>) { }

  ngOnInit() {
  }

}
