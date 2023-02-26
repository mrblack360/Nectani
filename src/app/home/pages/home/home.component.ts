import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentYear = new Date().getFullYear();
  candidateTypes = [
    { value: 'P', description: 'private' },
    { value: 'S', description: 'school' },
  ];
  educationLevel = [
    { value: 'acsee', description: 'A-Level' },
    { value: 'csee', description: 'O-Level' },
  ];
  resultForm: FormGroup;
  constructor(
    private router: Router,
    private appService: AppService,
    private toastController: ToastController
  ) {
    this.resultForm = new FormGroup({
      year_completed: new FormControl(this.currentYear, [Validators.required]),
      candidate_type: new FormControl('', [Validators.required]),
      school_number: new FormControl('', [Validators.required]),
      candidate_number: new FormControl('', [Validators.required]),
      class_level: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    if (this.resultForm.touched) {
      this.showToast('You can swipe down to clear form values at once');
    }
  }

  searchResults() {
    this.appService.setRequest(this.resultForm.value);
    this.router.navigate(['home/home/results']);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.resultForm.reset();
    }, 1000);
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
