import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionsListByYearComponent } from './components/champions-list-by-year/champions-list-by-year.component';
import { SeasonRaceListComponent } from './components/season-race-list/season-race-list.component';

const routes: Routes = [
  { path: '', component: ChampionsListByYearComponent },
  { path: 'detail', component: SeasonRaceListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
