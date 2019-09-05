import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepWelcomePage } from './rep-welcome';

@NgModule({
  declarations: [
    RepWelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(RepWelcomePage),
  ],
})
export class RepWelcomePageModule {}
