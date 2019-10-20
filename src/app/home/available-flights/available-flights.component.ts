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

    let fromId = document.getElementById('from').getAttribute('value').split(',')[0];
    let toId = document.getElementById('from').getAttribute('value').split(',')[1];

    this.utils.getFlightBetween(fromId, toId, data => {
      this.flights = data.filter(e => {
        console.log((e as FlightModel).startDate);

        let d1 = new Date((e as FlightModel).startDate.split('T')[0]);
        d1.setHours(0, 0, 0, 0);

        if (this.utils.selectedDate.getTime() == d1.getTime()) {

          // console.log('selected', this.utils.selectedDate);
          // console.log('checking', new Date((e as FlightModel).startDate));
          return true;
        }else {
          return false;
        }
      });
      console.log(data);

    });
  }
}
