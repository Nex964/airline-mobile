import { Component, OnInit } from '@angular/core';
import { FlightModel, UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-available-flights',
  templateUrl: './available-flights.component.html',
  styleUrls: ['./available-flights.component.scss']
})
export class AvailableFlightsComponent implements OnInit {

  flights = [] as FlightModel[]

  constructor(private utils: UtilsService) { }

  ngOnInit() {

    this.utils.availableFlights.subscribe(data => {
      this.flights = data;
    })
  }
}
