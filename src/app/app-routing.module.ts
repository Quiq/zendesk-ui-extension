import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent }      from './tickets.component';
import { TicketDetailComponent }  from './ticket-detail.component';

const routes: Routes = [
  { path: 'tickets',     component: TicketsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
