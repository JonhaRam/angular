import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralResponse, Util} from '../util/util';
import {Observable, Subject} from 'rxjs';


@Injectable()
export class SpotsTypesService {

  private spotTypeCreated = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {

  }

  getMessage(): Observable<boolean> {
    return this.spotTypeCreated.asObservable();
  }

  updateMessage(message: boolean) {
    this.spotTypeCreated.next(message);
  }

  /**
   * Obtiene los distintos tipos de espacios para cargarlos en un dropdown
   */
  getSpotsTypesOptions(): Observable<GeneralResponse> {
    return this.httpClient.get<GeneralResponse>(Util.SpotsTypesURL() + '/opciones');
  }

  /**
   * Lista los distintos tipos de espacios y sus detalles
   */
  getSpotsTypes(): Observable<GeneralResponse> {
    return this.httpClient.get<GeneralResponse>(Util.SpotsTypesURL());
  }

  getSpotsType(spotTypeId: string): Observable<GeneralResponse> {
    return this.httpClient.get<GeneralResponse>(Util.SpotsTypesURL() + '/' + spotTypeId.toString());
  }

  /**
   * Registra un nuevo tipo de espacio
   */
  createSpotType(newSpotType: NewSpotType): Observable<GeneralResponse> {
    return this.httpClient.post<GeneralResponse>(
      Util.SpotsTypesURL(),
      newSpotType
    );
  }

  updateSpotType(spotTypeId: number, spotTypeUpdated: SpotTypeUpdated): Observable<GeneralResponse> {
    return this.httpClient.put<GeneralResponse>(
      Util.SpotsTypesURL() + '/' + spotTypeId.toString(),
      spotTypeUpdated
    );
  }

  deleteSpotType(spotTypeId: number): Observable<GeneralResponse> {
    return this.httpClient.delete<GeneralResponse>(Util.SpotsTypesURL() + '/' + spotTypeId.toString());
  }

}


export interface ListSpotsTypes {
  id: number;
  name: string;
}

export interface SpotTypeDetail {
  id: number;
  name: string;
}

export interface SpotsTypesOptions {
  id: number;
  name: string;
}

export interface NewSpotType {
  name: string;
}

export interface SpotTypeUpdated {
  name: string;
}
