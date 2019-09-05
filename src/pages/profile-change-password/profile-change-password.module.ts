import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileChangePasswordPage } from './profile-change-password';

@NgModule({
  declarations: [
    ProfileChangePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileChangePasswordPage),
  ],
})
export class ProfileChangePasswordPageModule {}
