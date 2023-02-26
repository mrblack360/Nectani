import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Share } from '@capacitor/share';
import { ModalController, ToastController } from '@ionic/angular';
import { toJpeg, toBlob } from 'html-to-image';
import { ContextMenuComponent } from './pages/context-menu/context-menu.component';

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
    private toastController: ToastController,
    private modalController: ModalController
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
      (this.router.url == '/home/home/results' &&
        results != null &&
        results?.cno != null) ||
      (this.router.url == '/home/history/view' &&
        this.appService.getCurrentHistory()?.cno != null)
    );
  }

  canSave(): boolean {
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
    var results: any;
    if (this.canSave()) results = this.appService.getResults();
    else results = this.appService.getCurrentHistory();
    let node: HTMLDivElement = document.createElement('div');
    node.id = 'myDiv';
    node.innerHTML =
      '<style> .container {background: #fff; color:#000;} .watermark { display: block; position: relative; } .watermark::after { width:400px; content: ""; background:url("assets/icon/favicon.png"); opacity: 0.1; top: 0; left: 0; bottom: 0; right: 0; position: absolute; z-index: -1; background-repeat:no-repeat; background-size: cover; } table { background:#ffffff; color:#000000; font-family: arial, sans-serif; border-collapse: collapse; width: 400px; } td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; } </style> <div class="watermark"> <table> <tr> <th>Index Number</th> <td>' +
      results?.cno +
      '/' +
      results?.year_completed +
      '</td> </tr> <tr> <th>Gender</th> <td>' +
      (results?.sex == 'M' ? 'MALE' : results?.sex == 'F' ? 'FEMALE' : '') +
      '</td> </tr> <tr> <th>Division</th> <td>' +
      results?.div +
      '</td> </tr> <tr> <th>Aggregates</th> <td>' +
      results?.aggt +
      '</td> </tr> <tr> <th colspan="2">Details</th> </tr> <tr> <td colspan="2">' +
      results?.detailed +
      '</td> </tr> </table> </div>';
    document.body.appendChild(node);
    toJpeg(node).then(async (dataUrl) => {
      let link = document.createElement('a');
      link.download = results?.key + '.jpeg';
      link.href = dataUrl;
      link.click();

      await Share.share({
        title: 'Nectani - Share Results',
        text:
          'The results for ' +
          results?.cno +
          '/' +
          results?.year_completed +
          ' is Division ' +
          results?.div +
          ' of Aggregates ' +
          results?.aggt +
          ' and detailed as: ' +
          results?.detailed +
          '\nGet your own results and more at ',
        url: 'https://nectani.findmyschool.co.tz:8081',
        dialogTitle: 'Share with buddies',
        // files: ['file:///C:/Users/23149475/Pictures/favicon.png'],
      });
    });
    document.body.removeChild(node);
  }
  public async openMenu() {
    const contextMenu = this.modalController.create({
      component: ContextMenuComponent,
    });
    (await contextMenu).present();
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
