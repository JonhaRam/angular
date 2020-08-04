export class Util {

  static readonly SERVER_URL = 'http://34.200.146.138:10001/api';

  static SpotsTypesURL(): string {
    return this.SERVER_URL + '/spots_types';
  }

  static SpotsURL(): string {
    return this.SERVER_URL + '/spots';
  }

}

export interface GeneralResponse {
  success: boolean;
  data: any;
}
