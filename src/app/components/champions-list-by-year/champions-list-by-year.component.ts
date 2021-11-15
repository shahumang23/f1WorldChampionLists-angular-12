import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataShareService } from 'src/app/services/data-share.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-champions-list-by-year',
  templateUrl: './champions-list-by-year.component.html',
  styleUrls: ['./champions-list-by-year.component.scss'],
})
export class ChampionsListByYearComponent implements OnInit, OnDestroy {
  private destroyStream$ = new Subject<void>();
  public standingsLists: any;
  public isError: boolean = false;
  public title: string = 'F1 world champions lists 2005 to 2020';
  public icon: string = 'fa fa-list-ul';

  constructor(
    private restService: RestService,
    private dataShareService: DataShareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getChampionshipListByYear();
  }

  /**
   * @param: none
   * @return: void
   * Get the Championship Lists By Year from restService
   */
  getChampionshipListByYear(): void {
    this.isError = false;
    this.restService
      .getChampionsListByYear()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (response) => {
          console.log(response);
          this.standingsLists = response.MRData.StandingsTable.StandingsLists;
        },
        (error) => {
          this.isError = true;
        }
      );
  }

  selectedYear(year: string, name: string) {
    this.dataShareService.selectedChampionshipYear({
      selectedYear: year,
      winnerName: name,
    });
    this.router.navigateByUrl('/detail');
  }

  ngOnDestroy(): void {
    this.destroyStream$.next();
    this.destroyStream$.complete();
  }
}
