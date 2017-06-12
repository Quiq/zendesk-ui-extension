import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketPreviewComponent } from './ticket-preview.component';
import { TicketsComponent } from './tickets.component';
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard.component';
import { OauthComponent } from './oauth.component';

@NgModule({
  providers: [AuthService],
  imports:      [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
  ],
  declarations: [
    AppComponent,
    TicketsComponent,
    TicketDetailComponent,
    TicketPreviewComponent,
    DashboardComponent,
    OauthComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
