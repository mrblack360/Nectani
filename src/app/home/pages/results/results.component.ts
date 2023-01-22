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
  noResults = false;
  loaded = false;
  constructor(private appService: AppService) {
    this.appService.postResults().subscribe(
      (data) => {
        this.results = data;
        this.appService.setResults(data);
        if (this.results.cno) {
          this.loaded = true;
        } else this.noResults = true;
      },
      (err: any) => {
        this.noResults = true;
        this.loaded = true;
      }
    );
  }

  ngOnInit() {
    this.data = this.appService.getRequest();
  }
}
