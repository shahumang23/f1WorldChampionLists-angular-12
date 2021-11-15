import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { ChampionsListByYearComponent } from './champions-list-by-year.component';
import { Router } from '@angular/router';

describe('ChampionsListByYearComponent', () => {
  let component: ChampionsListByYearComponent;
  let fixture: ComponentFixture<ChampionsListByYearComponent>;
  let restServiceSpy: {
    getChampionsListByYear: { and: { returnValue: (arg0: any) => void } };
  };
  let mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(async () => {
    restServiceSpy = jasmine.createSpyObj('RestService', [
      'getChampionsListByYear',
      'getSeasonList',
    ]);

    restServiceSpy.getChampionsListByYear.and.returnValue(
      of({
        MRData: {
          StandingsTable: {
            StandingsLists: [
              {
                season: '2005',
                round: '19',
                DriverStandings: [
                  {
                    position: '1',
                    positionText: '1',
                    points: '133',
                    wins: '7',
                    Driver: {
                      driverId: 'alonso',
                      permanentNumber: '14',
                      code: 'ALO',
                      url: 'http://en.wikipedia.org/wiki/Fernando_Alonso',
                      givenName: 'Fernando',
                      familyName: 'Alonso',
                      dateOfBirth: '1981-07-29',
                      nationality: 'Spanish',
                    },
                    Constructors: [
                      {
                        constructorId: 'renault',
                        url: 'http://en.wikipedia.org/wiki/Renault_in_Formula_One',
                        name: 'Renault',
                        nationality: 'French',
                      },
                    ],
                  },
                ],
              },
              {
                season: '2006',
                round: '18',
                DriverStandings: [
                  {
                    position: '1',
                    positionText: '1',
                    points: '134',
                    wins: '7',
                    Driver: {
                      driverId: 'alonso',
                      permanentNumber: '14',
                      code: 'ALO',
                      url: 'http://en.wikipedia.org/wiki/Fernando_Alonso',
                      givenName: 'Fernando',
                      familyName: 'Alonso',
                      dateOfBirth: '1981-07-29',
                      nationality: 'Spanish',
                    },
                    Constructors: [
                      {
                        constructorId: 'renault',
                        url: 'http://en.wikipedia.org/wiki/Renault_in_Formula_One',
                        name: 'Renault',
                        nationality: 'French',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      })
    );

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ChampionsListByYearComponent],
      providers: [
        { provide: RestService, useValue: restServiceSpy },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionsListByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call ngOnInit method', fakeAsync(() => {
    component.ngOnInit();
    expect(restServiceSpy.getChampionsListByYear).toHaveBeenCalled();
    flush();
  }));

  it('should call selectedYear method', () => {
    component.selectedYear('2015', 'test');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/detail');
  });
});
