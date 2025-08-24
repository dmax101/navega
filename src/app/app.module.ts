import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuItemComponent } from './dashboard/components/menu-item/menu-item.component';
import { ContributionCardComponent } from './dashboard/components/contribution-card/contribution-card.component';
import { SharedAuthModule } from '@navega/shared-auth';

const sharedAuthModule = SharedAuthModule.forRoot({
  tokenKey: 'navega_auth_token',
  userKey: 'navega_auth_user',
  loginRoute: '/login',
  dashboardRoute: '/dashboard'
});

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuItemComponent,
    ContributionCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    sharedAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
