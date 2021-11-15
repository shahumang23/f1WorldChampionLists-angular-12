import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataShareService } from 'src/app/services/data-share.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-season-race-list',
  templateUrl: './season-race-list.component.html',
  styleUrls: ['./season-race-list.component.scss'],
})
export class SeasonRaceListComponent implements OnInit, OnDestroy {
  private destroyStream$ = new Subject<void>();
  private subscription!: Subscription;

  selectedChampionShipYearValue: any;
  seasonRaceListValue: any;
  public title: string = '';
  public icon: string = 'fa fa-info-circle';
  constructor(
    private dataShareService: DataShareService,
    private restService: RestService
  ) {}

  ngOnInit(): void {
    this.dataShareService.selectedChampionship
      .pipe(takeUntil(this.destroyStream$))
      .subscribe((data: any) => {
        this.selectedChampionShipYearValue = data;
      });
    this.getSelectedYearSeasonRaceList();
    this.title = 'Formula 1' + this.selectedChampionShipYearValue.selectedYear + 'Results';
  }

  /**
   * @param: none
   * @return: void
   * Get the Selected Year Season Race list from restService
   */

  getSelectedYearSeasonRaceList() {
    this.subscription = this.restService
      .getSeasonList(this.selectedChampionShipYearValue.selectedYear)
      .subscribe((response) => {
        this.seasonRaceListValue = response.MRData.RaceTable.Races;
      });
  }

  ngOnDestroy() {
    this.destroyStream$.next();
    this.destroyStream$.complete();
    this.subscription.unsubscribe();
  }
}
