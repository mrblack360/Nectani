import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
})
export class HistoryViewComponent implements OnInit {
  results: any;
  noResults = false;
  loaded = false;

  constructor(private appService: AppService) {
    this.results = this.appService.getCurrentHistory();
    if (this.results?.cno) {
      this.loaded = true;
    } else {
      this.noResults = true;
      this.loaded = true;
    }
  }

  ngOnInit() {}
}
