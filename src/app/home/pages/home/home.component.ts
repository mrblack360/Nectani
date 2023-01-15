import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentYear = new Date().getFullYear();
  candidateTypes = [
    { value: 'P', description: 'Private' },
    { value: 'S', description: 'School' },
  ];
  educationLevel = [
    { value: 'acsee', description: 'A-Level' },
    { value: 'csee', description: 'O-Level' },
  ];
  resultForm: FormGroup;
  constructor(private router: Router) {
    this.resultForm = new FormGroup({
      year_completed: new FormControl(this.currentYear, [Validators.required]),
      candidate_type: new FormControl('', [Validators.required]),
      school_number: new FormControl('', [Validators.required]),
      candidate_number: new FormControl('', [Validators.required]),
      class_level: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  searchResults() {
    this.router.navigate(['home/home/results']);
  }
}
