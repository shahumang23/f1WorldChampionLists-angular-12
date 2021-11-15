import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { RestService } from './rest.service';

describe('RestService', () => {
  let service: RestService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService],
    });
    injector = getTestBed();
    service = injector.get(RestService);
    httpMock = injector.get(HttpTestingController);
  });

  it(
    'able to fetch championship list by year the API via GET',
    waitForAsync(() => {
      const dummyGetResponse: any = {
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
      };

      service.getChampionsListByYear().subscribe((users) => {
        expect(users).toEqual(dummyGetResponse);
      });

      const req = httpMock.expectOne(`${service.configUrl}`+`${service.championshipListUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyGetResponse);
    })
  );

  it(
    'able to fetch getSeasonList list by year the API via GET',
    waitForAsync(() => {
      const dummyGetResponse: any = {
        MRData: {
          RaceTable: {
            season: '2015',
            position: '1',
            Races: [
              {
                season: '2015',
                round: '1',
                url: 'http://en.wikipedia.org/wiki/2015_Australian_Grand_Prix',
                raceName: 'Australian Grand Prix',
                Circuit: {
                  circuitId: 'albert_park',
                  url: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
                  circuitName: 'Albert Park Grand Prix Circuit',
                  Location: {
                    lat: '-37.8497',
                    long: '144.968',
                    locality: 'Melbourne',
                    country: 'Australia',
                  },
                },
                date: '2015-03-15',
                time: '05:00:00Z',
                Results: [
                  {
                    number: '44',
                    position: '1',
                    positionText: '1',
                    points: '25',
                    Driver: {
                      driverId: 'hamilton',
                      permanentNumber: '44',
                      code: 'HAM',
                      url: 'http://en.wikipedia.org/wiki/Lewis_Hamilton',
                      givenName: 'Lewis',
                      familyName: 'Hamilton',
                      dateOfBirth: '1985-01-07',
                      nationality: 'British',
                    },
                    Constructor: {
                      constructorId: 'mercedes',
                      url: 'http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One',
                      name: 'Mercedes',
                      nationality: 'German',
                    },
                    grid: '1',
                    laps: '58',
                    status: 'Finished',
                    Time: {
                      millis: '5514067',
                      time: '1:31:54.067',
                    },
                    FastestLap: {
                      rank: '1',
                      lap: '50',
                      Time: {
                        time: '1:30.945',
                      },
                      AverageSpeed: {
                        units: 'kph',
                        speed: '209.915',
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
      };

      service.getSeasonList('2015').subscribe((users) => {
        expect(users).toEqual(dummyGetResponse);
      });
    })
  );
});
