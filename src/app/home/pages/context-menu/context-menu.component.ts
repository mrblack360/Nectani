import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  menuItems = [
    {
      icon: 'arrow-back-outline',
      handler: () => {
        return this.modal.dismiss(null, 'cancel');
      },
    },
    {
      label: 'Change Theme',
      icon: 'moon-outline',
      handler: async () => {
        if (this.appService.currentTheme == 'default') {
          const action = this.actionCtrl.create({
            header: "You're about to change to dark theme. Are you sure?",
            buttons: [
              {
                text: 'Yes',
                role: 'confirm',
                handler: async () => {
                  this.appService.changeTheme('dark');
                },
              },
              {
                text: 'No',
                role: 'cancel',
              },
            ],
          });
          (await action).present();
        } else {
          const action = this.actionCtrl.create({
            header: "You're about to change to light theme. Are you sure?",
            buttons: [
              {
                text: 'Yes',
                role: 'confirm',
                handler: async () => {
                  this.appService.changeTheme('default');
                },
              },
              {
                text: 'No',
                role: 'cancel',
              },
            ],
          });
          (await action).present();
        }
      },
    },
    {
      label: 'Change Language',
      icon: 'language-outline',
      handler: () => {},
    },
    {
      label: 'Share with friends',
      icon: 'share-social-outline',
      handler: () => {},
    },
    {
      label: 'Rate Us',
      icon: 'star-half-outline',
      handler: () => {},
    },
    {
      label: 'About Us',
      icon: 'information-circle-outline',
      handler: () => {},
    },
    {
      label: 'Terms & Conditions',
      icon: 'list-circle-outline',
      handler: () => {},
    },
    {
      label: 'Privacy Policy',
      icon: 'document-lock-outline',
      handler: () => {},
    },
  ];
  constructor(
    private modal: ModalController,
    private appService: AppService,
    private actionCtrl: ActionSheetController
  ) {}

  ngOnInit() {}

  closeMenu() {
    return this.modal.dismiss(null, 'cancel');
  }
}
