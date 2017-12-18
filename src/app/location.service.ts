import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from "@angular/http";
import "rxjs/add/operator/map";


@Injectable()

export class LocationService {

  private url: string ="https://developers.zomato.com/api/v2.1/";

  constructor( private http: Http ) { }

  getLocation(val) {
    var header = new Headers();
    header.append('user-key', '4d4d81cf0b58ac08cb7faff74b806968');
    let options = new RequestOptions({ headers: header });
    
    return this.http.get(this.url + "locations?query=" + val, options)
    .map(res => res.json());

  }

  getRestaurants(val) {
    var header = new Headers();
    header.append('user-key', '4d4d81cf0b58ac08cb7faff74b806968');
    header.append('Accept', 'application/json');
    return this.http.get(this.url + "search?entity_type=subzone&lat=" + val.latitude + "&lon=" + val.longitude + "&sort=rating&order=desc", { headers: header})
    .map(res => res.json());
  }
  // https://developers.zomato.com/api/v2.1/search?entity_type=subzone&lat=28.6618976&lon=77.2273958&sort=rating&order=desc

}
