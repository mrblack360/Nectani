import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { ResultsComponent } from './pages/results/results.component';
import { HistoryViewComponent } from './pages/history-view/history-view.component';
import { ContextMenuComponent } from './pages/context-menu/context-menu.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    HomePage,
    HomeComponent,
    HistoryComponent,
    ResultsComponent,
    HistoryViewComponent,
    ContextMenuComponent,
  ],
})
export class HomePageModule {}
