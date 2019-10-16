import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material';
import { Param, UtilsService } from 'src/app/utils.service';
import { utils } from 'protractor';

@Component({
  selector: 'app-selectors',
  templateUrl: './selectors.component.html',
  styleUrls: ['./selectors.component.scss']
})
export class SelectorsComponent implements OnInit {

  currentDate;
  someDateArray: Date[];
  _datesArray: Date[];
  @ViewChild('myCalendar', { static: true }) calendar: MatCalendar<Date>;

  isSelectingDate = 0;
  lastUsedAirport = '';

  constructor(private utils: UtilsService) {
    this.currentDate = new Date();
  }

  ngOnInit() {
  }

  showLocation(event: any, calDiv: HTMLDivElement, id: string) {

    this.isSelectingDate = 1;

    let list = [] as Param[];

    this.utils.getAirport(data => {
      data.forEach(e => {
        if (this.utils.lastUsedAirport == e._id) { return }
        list.push({ name: e.code + '\n' + `(${e.city})`, value: e._id });
      });

      this.utils.setListData(list, id);


      document.getElementById('list_dialog').classList.add('show');
    })
  }

  selectDate(e: any, date: HTMLHeadingElement) {

    let isAvail = false
    let d = new Date(e.toString())

    this.utils.flightData.forEach(e => {
      let d1 = new Date(e.startDate.split('T')[0]);
      d1.setHours(0, 0, 0, 0);

      if (d1.getTime() == d.getTime()) {
        isAvail = true;
      }
    })

    if (isAvail) {
      this.utils.selectedDate = d
      this.isSelectingDate = 2;
      console.log(e);
      e = e.toString();
      date.innerText = e.split(" ")[2] + " " + e.split(" ")[1] + " " + e.split(" ")[0];
      this.utils.state.next(3);
    }
    else {
      alert('No flights avilable on the date')
    }
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      for (let i = 0; i < this.utils.flightData.length; i++) {
        let e = this.utils.flightData[i];
        let newDate = new Date(e.startDate.split('T')[0]);
        newDate.setHours(0, 0, 0, 0);

        if (date.getTime() === newDate.getTime()) {
          console.log("Found");
          return 'special-date';
        }
      }
      return;
    };
  }

}
