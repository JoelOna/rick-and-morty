import { Component, OnInit } from '@angular/core';
import { LocationDataServiceService } from '../services/location-data-service.service';
import { ILocation } from '../interfaces/ilocation';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit{
  constructor(private locationService : LocationDataServiceService){}

  locations: ILocation[] = []

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(
      response =>{
        if (response.body != null) {
          this.locations = response.body.results
          this.pageSize = response.body.results.length
          this.length = response.body.info.count
        }
      },error=>{

      }
    )
  }

  length = 0
  pageSize = 0;
  pageIndex = 1;

  pageEvent: PageEvent | undefined;


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.locationService.getLocationsPage(e.pageIndex).subscribe(
      resp => {
        this.locations = resp.body.results
        console.log(resp.body.results);


      }
    )
  }
}
