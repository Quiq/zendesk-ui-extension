import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent }      from './tickets.component';
import { TicketDetailComponent }  from './ticket-detail.component';
import { OauthComponent } from './oauth.component';

const routes: Routes = [
  { path: 'detail/:id', component: TicketDetailComponent },
  { path: 'tickets',     component: TicketsComponent },
  { path: 'oauth', component: OauthComponent },
  { path: '', redirectTo: '/tickets', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
