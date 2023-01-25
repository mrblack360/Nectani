import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Share } from '@capacitor/share';
// import { Toast } from '@capacitor/toast';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private _location: Location,
    private router: Router,
    private appService: AppService,
    private toastController: ToastController
  ) {}

  canGoBack(): boolean {
    return this.router.url != '/home/home';
  }

  goBack() {
    this._location.back();
  }
  canViewResults(): boolean {
    let results = this.appService.getResults();
    return (
      this.router.url == '/home/home/results' &&
      results != null &&
      results?.cno != null
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
      if (history?.some((data: any) => data.key === result.key)) {
        this.showToast(
          'These results are already saved! Click History to view them'
        );
      } else {
        history.push(result);
        this.appService.storageSet('history', JSON.stringify(history));
        this.showToast(
          'Results save successfully. Click History to view them later.'
        );
      }
    });
  }
  async share() {
    await Share.share({
      title: 'Share results',
      text: this.appService.getResults().detailed,
      url: '',
      dialogTitle: 'Share with buddies',
    });
  }
  async showToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000,
      cssClass: 'toast',
    });
    await toast.present();
  }
}
