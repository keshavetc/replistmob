import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepSearchPage } from './rep-search';

@NgModule({
  declarations: [
    RepSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RepSearchPage),
  ],
})
export class RepSearchPageModule {}
