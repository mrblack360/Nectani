import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import * as moment from 'moment';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  history: any = [];
  loading = true;
  noResults = false;
  constructor(
    private appService: AppService,
    private actionCtrl: ActionSheetController,
    private toastController: ToastController
  ) {
    this.appService
      .getHistory()
      .then((data: any[]) => {
        this.history = data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.noResults = true;
      });
  }

  ngOnInit() {}

  timeString(date: any): string {
    let time = '';
    let mom = moment(date);
    let now = moment();
    let today = now.startOf('day');
    let yesterday = now.subtract(1, 'days').startOf('day');
    let d7 = now.subtract(6, 'days').startOf('day');
    time = mom.format('YYYY/MM/DD');

    // if (mom.isAfter(today)) {
    //   time = moment(date).format('HH:mm');
    // } else if (mom.isAfter(yesterday)) {
    //   time = 'Yesterday';
    // } else if (mom.isSame(d7, 'week')) {
    //   time = mom.format('DDDD');
    // } else {
    //   time = mom.format('YYYY/MM/DD');
    // }
    return time;
  }
  async deleteHistory(index: number) {
    const actionSheet = this.actionCtrl.create({
      header: "You're about to delete saved results. Are you sure?",
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
          handler: async () => {
            this.history.splice(index, 1);
            this.appService.storageSet('history', JSON.stringify(this.history));
            await this.showToast('Results have been deleted successfully');
          },
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });
    (await actionSheet).present();
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
