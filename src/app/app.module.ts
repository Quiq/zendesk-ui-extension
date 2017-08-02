import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdTooltipModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {TicketDetailComponent} from './ticket-detail.component';
import {TicketsComponent} from './tickets.component';
import {AuthService} from './auth.service';
import {EnvService} from './envs.service';

@NgModule({
  providers: [AuthService, EnvService],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdTooltipModule,
    NgbModule.forRoot(),
  ],
  declarations: [AppComponent, TicketsComponent, TicketDetailComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
