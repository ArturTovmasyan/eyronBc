import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-ideas-category',
  templateUrl: './ideas-category.component.html',
  styleUrls: ['./ideas-category.component.css']
})
export class IdeasCategoryComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit() {
    let category = +this.route.snapshot.params['category'];

    // this.service.getHero(id)
    //     .then((hero: Hero) => this.hero = hero);
  }

  gotoIdeas() {
    this.router.navigate(['/ideas']);
  }

}
