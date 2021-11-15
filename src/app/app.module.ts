import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChampionsListByYearComponent } from './components/champions-list-by-year/champions-list-by-year.component';
import { SeasonRaceListComponent } from './components/season-race-list/season-race-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ChampionsListByYearComponent,
    SeasonRaceListComponent,
    AppHeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
