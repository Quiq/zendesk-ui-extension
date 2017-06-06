import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { TicketsComponent }      from './tickets.component';
import { TicketDetailComponent }  from './ticket-detail.component';
import { OauthComponent } from './oauth.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: TicketDetailComponent },
  { path: 'tickets',     component: TicketsComponent },
  { path: 'oauth', component: OauthComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
