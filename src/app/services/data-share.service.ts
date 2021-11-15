import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataShareService {
  private selectedChampionshipYearSubject$ = new BehaviorSubject<any>({});

  constructor() {}

  get selectedChampionship() {
    return this.selectedChampionshipYearSubject$.asObservable();
  }

  selectedChampionshipYear(data: any) {
    this.selectedChampionshipYearSubject$.next(data);
  }
}
