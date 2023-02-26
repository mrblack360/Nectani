import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { Share } from '@capacitor/share';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../../home.page';
@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  menuItems: any;
  constructor(
    private modal: ModalController,
    private appService: AppService,
    private actionCtrl: ActionSheetController,
    private translate: TranslateService
  ) {
    this.setMenuItems();
  }

  ngOnInit() {}

  closeMenu() {
    return this.modal.dismiss(null, 'cancel');
  }
  setMenuItems() {
    this.menuItems = [
      {
        icon: 'arrow-back-outline',
        handler: () => {
          return this.modal.dismiss(null, 'cancel');
        },
      },
      {
        label: this.translate.instant('context_menu.change_theme.label'),
        icon: 'moon-outline',
        handler: async () => {
          if (this.appService.currentTheme == 'default') {
            const action = this.actionCtrl.create({
              header: this.translate.instant(
                'context_menu.change_theme.header',
                {
                  theme: 'dark',
                }
              ),
              buttons: [
                {
                  text: this.translate.instant('context_menu.confirmation.yes'),
                  role: 'confirm',
                  handler: async () => {
                    this.appService.changeTheme('dark');
                  },
                },
                {
                  text: this.translate.instant('context_menu.confirmation.no'),
                  role: 'cancel',
                },
              ],
            });
            (await action).present();
          } else {
            const action = this.actionCtrl.create({
              header: this.translate.instant(
                'context_menu.change_theme.header',
                {
                  theme: 'light',
                }
              ),
              buttons: [
                {
                  text: this.translate.instant('context_menu.confirmation.yes'),
                  role: 'confirm',
                  handler: async () => {
                    this.appService.changeTheme('default');
                  },
                },
                {
                  text: this.translate.instant('context_menu.confirmation.no'),
                  role: 'cancel',
                },
              ],
            });
            (await action).present();
          }
        },
      },
      {
        label: this.translate.instant('context_menu.change_language'),
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
                    this.setMenuItems();
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
              header:
                'Unaelekea kubadilisha lugha kuwa Kiingereza. Thibitisha?',
              buttons: [
                {
                  text: 'Ndio',
                  role: 'confirm',
                  handler: async () => {
                    this.appService.changeLanguage('en');
                    this.setMenuItems();
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
        label: this.translate.instant('context_menu.share_app.label'),
        icon: 'share-social-outline',
        handler: async () => {
          await Share.share({
            title: this.translate.instant('context_menu.share_app.title'),
            text: this.translate.instant('context_menu.share_app.text'),
            url: 'https://nectani.findmyschool.co.tz:8081',
          });
        },
      },
      {
        label: this.translate.instant('context_menu.rate_app'),
        icon: 'star-half-outline',
        handler: () => {
          window.open('https://nectani.findmyschool.co.tz:8081', '_system');
        },
      },
      {
        label: this.translate.instant('context_menu.about_us'),
        icon: 'information-circle-outline',
        handler: () => {
          window.open('https://nectani.findmyschool.co.tz:8081', '_system');
        },
      },
      {
        label: this.translate.instant('context_menu.terms_and_conditions'),
        icon: 'list-circle-outline',
        handler: () => {
          window.open('https://nectani.findmyschool.co.tz:8081', '_system');
        },
      },
      {
        label: this.translate.instant('context_menu.privacy_policy'),
        icon: 'document-lock-outline',
        handler: () => {
          window.open('https://nectani.findmyschool.co.tz:8081', '_system');
        },
      },
    ];
  }
}
