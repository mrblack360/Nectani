import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  currentRequest: any;
  currentResults: any;
  currentHistory: any;
  renderer: Renderer2;
  currentTheme: any;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url = 'https://nectani.findmyschool.co.tz:8081/api/';

  constructor(
    private http: HttpClient,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    if (localStorage.getItem('theme')) {
      this.changeTheme(localStorage.getItem('theme'));
      console.log(localStorage.getItem('theme'));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDark.matches) this.changeTheme('dark');
      else this.changeTheme();
    }
  }

  public storageSet(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  public async storageGet(key: string) {
    const value = await localStorage.getItem(key);
    return value;
  }

  postResults(): Observable<any> {
    return this.http.post(this.url + 'candidate', this.currentRequest, {
      headers: this.headers,
    });
  }
  async getHistory(): Promise<any[]> {
    const history = await this.storageGet('history');
    return JSON.parse(history ? history : '[]');
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
  setCurrentHistory(history: any) {
    this.currentHistory = history;
  }
  getCurrentHistory(): any {
    return this.currentHistory;
  }
  changeTheme(theme: any = 'default') {
    this.renderer.removeClass(this.document.body, this.currentTheme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.renderer.addClass(this.document.body, theme);
  }
}
