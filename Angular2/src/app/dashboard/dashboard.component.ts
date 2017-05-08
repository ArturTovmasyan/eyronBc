import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo(0,0);
    // if(localStorage.getItem('apiKey')){
    //   this.router.navigate(['/activity']);
    // }
  }

}
