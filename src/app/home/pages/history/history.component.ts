import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  history: any = [];
  loading = true;
  noResults = false;
  constructor(private appService: AppService) {
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
  getKeys() {
    var keys;
    this.appService.storageKeysGet().then((keys) => {
      keys = keys;
    });
    return keys;
  }
}
