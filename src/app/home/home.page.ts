import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentYear = new Date().getFullYear();
  candidateTypes = [
    { value: 'p', description: 'Private' },
    { value: 's', description: 'School' },
  ];
  educationLevel = [
    { value: 'a', description: 'A-Level' },
    { value: 'o', description: 'O-Level' },
  ];
  constructor() {}
}
