import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { Share } from '@capacitor/share';
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
      handler: async () => {
        if (this.appService.currentLanguage == 'en') {
          const action = this.actionCtrl.create({
            header:
              "You're about to change your preferred language to Swahili. Are you sure?",
            buttons: [
              {
                text: 'Yes',
                role: 'confirm',
                handler: async () => {
                  this.appService.changeLanguage('sw');
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
            header: 'Unaelekea kubadilisha lugha kuwa Kiingereza. Thibitisha?',
            buttons: [
              {
                text: 'Ndio',
                role: 'confirm',
                handler: async () => {
                  this.appService.changeLanguage('en');
                },
              },
              {
                text: 'Hapana',
                role: 'cancel',
              },
            ],
          });
          (await action).present();
        }
      },
    },
    {
      label: 'Share with friends',
      icon: 'share-social-outline',
      handler: async () => {
        await Share.share({
          title: 'Nectani - Share',
          text: 'Hi,\nYou can view your NECTA results using Nectani App. Click the below link to download',
          url: 'https://nectani.findmyschool.co.tz:8081',
        });
      },
    },
    {
      label: 'Rate Us',
      icon: 'star-half-outline',
      handler: () => {},
    },
    {
      label: 'About Us',
      icon: 'information-circle-outline',
      handler: () => {
        window.open('https://nectani.findmyschool.co.tz:8081', '_system');
      },
    },
    {
      label: 'Terms & Conditions',
      icon: 'list-circle-outline',
      handler: () => {
        window.open('https://nectani.findmyschool.co.tz:8081', '_system');
      },
    },
    {
      label: 'Privacy Policy',
      icon: 'document-lock-outline',
      handler: () => {
        window.open('https://nectani.findmyschool.co.tz:8081', '_system');
      },
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
