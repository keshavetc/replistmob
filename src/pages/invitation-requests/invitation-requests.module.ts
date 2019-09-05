import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationRequestsPage } from './invitation-requests';

@NgModule({
  declarations: [
    InvitationRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationRequestsPage),
  ],
})
export class InvitationRequestsPageModule {}
