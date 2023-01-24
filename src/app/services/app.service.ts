import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  currentRequest: any;
  currentResults: any;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url = 'https://nectani.findmyschool.co.tz:8081/api/';
  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.storageInit();
  }

  async storageInit() {
    const storage = await this.storage.create();
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this._storage = storage;
  }
  public storageSet(key: string, value: any) {
    this._storage?.set(key, value);
  }
  public async storageGet(key: string) {
    const value = await this._storage?.get(key);
    return value;
  }
  public async storageKeysGet() {
    const keys = await this._storage?.keys();
    return keys;
  }
  postResults(): Observable<any> {
    return this.http.post(this.url + 'candidate', this.currentRequest, {
      headers: this.headers,
    });
  }
  async getHistory(): Promise<any[]> {
    const history = await this.storageGet('history');
    return JSON.parse(history);
  }
  setRequest(request: any) {
    this.currentRequest = request;
  }
  getRequest() {
    return this.currentRequest;
  }
  setResults(results: any) {
    this.currentResults = results;
  }
  getResults() {
    return this.currentResults;
  }
}

export const HISTORY = [
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2023-01-17T10:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    div: 'I',
    year_completed: '2020',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2023-01-17T10:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    div: 'I',
    year_completed: '2021',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2023-01-17T18:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    div: 'I',
    year_completed: '2019',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2023-01-16T18:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    div: 'I',
    year_completed: '2019',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2020-01-18T18:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    div: 'I',
    year_completed: '2020',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2022-01-18T18:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    year_completed: '2020',
    div: 'I',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2022-01-18T18:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    year_completed: '2020',
    div: 'I',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2022-01-18T18:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    year_completed: '2020',
    div: 'I',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2022-01-18T18:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    year_completed: '2020',
    div: 'I',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
  {
    id: 2,
    cno: 'S0445/0024',
    time: '2022-01-18T18:22:50.634Z',
    sex: 'M',
    aggt: ' 12',
    year_completed: '2020',
    div: 'I',
    detailed:
      "CIV - 'B'   HIST - 'C'   GEO - 'B'   KISW - 'B'   ENGL - 'A'   LIT ENG - 'B'   PHY - 'C'   CHEM - 'C'   BIO - 'A'   B/MATH - 'B'   ",
  },
];
