import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from "../location.service";
import { Observable } from "rxjs/observable";
import "rxjs/add/observable/CombineLatest";

import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

declare let $: any;

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit, AfterViewInit {

  public location: any;
  public coordinates: any;
  public restaurants;
  public restId: number;
  public restDetail: any;
  @ViewChild('myModal') myModal: ElementRef;

  constructor(private service: LocationService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.setPosition(pos));
    } else {
      console.log("Not supported in the browser");
    }
  }

  setPosition(position) {
    this.location = position.coords;
  }

  getCoords() {
    this.service.getLocation(this.coordinates)
      .subscribe(
      data => this.service.getRestaurants(data.location_suggestions[0]).subscribe(
        restaurants => this.restaurants = restaurants.restaurants,
        err => console.log(err)
      ),
      err => console.log(err)
      )
    console.log(this.restaurants)
  }

  open(id) {
    for (var i = 0; i < this.restaurants.length; i++) {
      this.restId = this.restaurants[i].restaurant.id;
      if (id === this.restId) {
        this.restDetail = this.restaurants[i].restaurant;
        console.log(this.restDetail.average_cost_for_two);
      }
    }
    $(this.myModal.nativeElement).modal('show');;
  }

  close() {
    $(this.myModal.nativeElement).modal('hide');
  }

}
