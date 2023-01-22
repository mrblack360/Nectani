import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private _location: Location,
    private router: Router,
    private appService: AppService
  ) {}

  canGoBack(): boolean {
    return this.router.url != '/home/home';
  }

  goBack() {
    this._location.back();
  }
  canViewResults(): boolean {
    return (
      this.router.url == '/home/home/results' &&
      this.appService.getResults() != null
    );
  }
  save() {}
  async share() {
    await Share.share({
      title: 'Share results',
      text: this.appService.getResults().detailed,
      url: 'https://nectani.findmyschool.co.tz:8081',
      dialogTitle: 'Share with buddies',
    });
  }
}
