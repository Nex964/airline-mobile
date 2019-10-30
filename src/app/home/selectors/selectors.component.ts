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
  priceList = [];
  locationList = [];

  constructor(private utils: UtilsService) {
    this.currentDate = new Date();
    this.utils.getInitFlights(data => {
      this.locationList = data;
    })
  }

  ngOnInit() {
    this.utils.flightDataSubject.subscribe(data => {
      this.isSelectingDate = 0;
      setTimeout(() => {
        this.isSelectingDate = 1;
      }, 100);
    })
  }

  showLocation(event: any, id: string) {
    let list = [] as Param[];

    // this.utils.getAirport(data => {
    //   data.forEach(e => {
    //     if (this.utils.lastUsedAirport == e._id) { return }
    //     list.push({ name: e.code + '\n' + `(${e.city})`, value: e._id });
    //   });

    //   this.utils.setListData(list, id);


    //   document.getElementById('list_dialog').classList.add('show');
    // })

    this.locationList.forEach(e => {
      list.push({name: e.display.replace("=>", "to"), value: e.src + ',' + e.dest});
    })
    this.utils.setListData(list, 'from')
    document.getElementById('list_dialog').classList.add('show');
    
  }

  selectDate(e: any, date: HTMLHeadingElement) {
    // document.getElementsByClassName('special-date')[0].childNodes[0].innerText;

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

      setTimeout(() => {
        this.utils.load();
      }, 300);
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

        setTimeout(() => {
          if(date.getMonth() % 2 == 0 && date.getDate() == 30){
            this.priceList = []
            console.log("ended");
            
          }
          if(date.getMonth() % 2 == 1 && date.getDate() == 31){
            this.priceList = []
            console.log("ended1");
          }
        }, 500);

        if (date.getTime() === newDate.getTime()) {

          // document.getElementsByClassName('special-date')[0].childNodes[0].innerText;
          this.priceList.push(e.rate);
          let index = this.priceList.length - 1;
          let price = e.rate;
          setTimeout(() => {
            let val = document.getElementsByClassName('special-date')[index].childNodes[0].textContent;
            // let h = new HTMLHeadingElement();
            (document.getElementsByClassName('special-date')[index].childNodes[0] as HTMLDivElement).innerHTML = val + '<br> <h6>' + price + '</h6>';
          }, 300);
          return 'special-date';
        }
      }
      return;
    };
  }

}
