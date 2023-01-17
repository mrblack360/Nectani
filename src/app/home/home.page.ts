import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private _location: Location, private router: Router) {}

  canGoBack(): boolean {
    return this.router.url != '/home/home';
  }

  goBack() {
    this._location.back();
  }
}
