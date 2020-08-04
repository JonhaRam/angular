import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralResponse, Util} from '../util/util';
import {Observable, Subject} from 'rxjs';


@Injectable()
export class SpotsService {

  constructor(private httpClient: HttpClient) {

  }

  getSpots(spotType: string = ''): Observable<GeneralResponse> {
    let spotsUrl = Util.SpotsURL();
    if (spotType) {
      spotsUrl += '?spot_type=' + spotType;
    }
    return this.httpClient.get<GeneralResponse>(spotsUrl);
  }

  getSpot(spotId: string): Observable<GeneralResponse> {
    return this.httpClient.get<GeneralResponse>(Util.SpotsURL() + '/' + spotId.toString());
  }

  createSpot(newSpotType: NewSpot): Observable<GeneralResponse> {
    return this.httpClient.post<GeneralResponse>(
      Util.SpotsURL(),
      newSpotType
    );
  }

  updateSpot(spotId: string, spotUpdated: SpotUpdated): Observable<GeneralResponse> {
    return this.httpClient.put<GeneralResponse>(
      Util.SpotsURL() + '/' + spotId.toString(),
      spotUpdated
    );
  }

  deleteSpot(spotId: number): Observable<GeneralResponse> {
    return this.httpClient.delete<GeneralResponse>(Util.SpotsURL() + '/' + spotId.toString());
  }

}

export interface SpotType {
  id: number;
  name: string;
}

export interface ListSpots {
  id: number;
  spot_type: SpotType;
  name: string;
  image: string;
  number: string;
  street: string;
  zip_code: string;
  lat: number;
  lng: number;
  created_at: string;
  updated_at: string;
}

export interface SpotDetail {
  id: number;
  spot_type: SpotType;
  name: string;
  image: string;
  number: string;
  street: string;
  zip_code: string;
  lat: number;
  lng: number;
  created_at: string;
  updated_at: string;
}

export interface NewSpot {
  name: string;
  spot_type_id: number;
  image: string;
  number: string;
  street: string;
  zip_code: string;
  lat: number;
  lng: number;
}

export interface SpotUpdated {
  name: string;
  spot_type_id: number;
  image: string;
  number: string;
  street: string;
  zip_code: string;
  lat: number;
  lng: number;
}
