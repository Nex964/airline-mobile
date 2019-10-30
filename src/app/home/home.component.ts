import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '../utils.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker/typings/calendar-body';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date: Date = new Date();

  state = 1

  price = 0

  @ViewChild('aFlight', {static: false}) aFlight;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    this.utils.getState().subscribe(data => {
      this.state = data;
      if(data == 5){
        try{
          this.price = this.utils.travellers * parseInt(this.utils.selectedFlight.rate)
        }
        catch(e){}
      }
    })
  }

  process() {
    if(this.utils.travellers != 0){
      this.utils.state.next(4);
    }
    else{
      alert('Select Travellers');
    }
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      for(let i = 0; i < this.utils.flightData.length; i++) {
        let e = this.utils.flightData[i];
        console.log('looking index: ', i);
        
        let newDate = new Date(e.startDate);
        if (date.getTime() === newDate.getTime()) {
          console.log("Found");
          return 'special-date';
        }
      }
      return;
    };
  }
}
