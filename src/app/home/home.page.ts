import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Share } from '@capacitor/share';
import { Toast } from '@capacitor/toast';

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
  save() {
    var result = this.appService.getResults();
    result.time = new Date();
    result.year_completed = this.appService.getRequest().year_completed;
    var key = result.cno + result.year_completed;
    result.key = key.replace('/', '');
    var history: any = [];
    this.appService.getHistory().then((data) => {
      history = data;
      console.log('History from storage', data);
      if (history?.some((data: any) => data.key == key)) {
        console.log(
          'These results are already saved! Click History to view them'
        );
        this.showToast(
          'These results are already saved! Click History to view them'
        );
      } else {
        history.push(result);
        console.log('New History', history);

        this.appService.storageSet('history', JSON.stringify(history));
        this.showToast(
          'Results save successfully. Click History to view them later.'
        );
      }
    });

    console.log(result);
  }
  async share() {
    await Share.share({
      title: 'Share results',
      text: this.appService.getResults().detailed,
      url: 'https://nectani.findmyschool.co.tz:8081',
      dialogTitle: 'Share with buddies',
    });
  }
  async showToast(text: string) {
    await Toast.show({
      text: text,
      position: 'bottom',
      duration: 'long',
    });
  }
}
