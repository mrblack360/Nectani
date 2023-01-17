import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  currentRequest: any;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url = 'http://185.185.82.250:8081/api/';
  constructor(private http: HttpClient) {}

  postResults(): Observable<any> {
    const sampleResult = {
      id: 2,
      cno: 'S0445/0024',
      sex: 'M',
      aggt: ' 12',
      div: 'I',
      detailed:
        "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
    };
    return of(sampleResult);
    // return this.http.post(this.url + 'candidate', this.currentRequest, {
    //   headers: this.headers,
    // });
  }
  setRequest(request: any) {
    this.currentRequest = request;
  }
  getRequest() {
    return this.currentRequest;
  }
}
