import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  data: any;
  results: any;
  loaded = false;
  constructor(private appService: AppService) {
    this.appService.postResults().subscribe((data) => {
      this.results = data;
      setTimeout(() => {
        this.loaded = true;
      }, 3000);
    });
  }

  ngOnInit() {
    this.data = this.appService.getRequest();
  }
}
