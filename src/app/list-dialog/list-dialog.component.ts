import { Component, OnInit } from '@angular/core';
import { Param, UtilsService } from '../utils.service';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})

export class ListDialogComponent implements OnInit {

  isShowing = true;

  list = [] as Param[];

  constructor(private utils: UtilsService) {
  }

  ngOnInit() {
    this.utils.getListData().subscribe(data => {
      this.list = data;
    })
  }

  select(item: Param) {

    let type = this.utils.listDataType;
    
    document.getElementById(this.utils.listDataType).innerText = item.name;
    document.getElementById(this.utils.listDataType).setAttribute('value', item.value);

    if (type == 'fdest' || type == 'tdest') {
      // this.utils.state.next(2);
      let fromId = document.getElementById('fdest').getAttribute('value');
      let toId = document.getElementById('tdest').getAttribute('value');

      this.utils.lastUsedAirport = fromId;

      this.utils.getFlightBetween(fromId, toId, data => {
        this.utils.flightData = data;
      });
    }
    if(type == 'from'){
      let fromId = item.value.split(',')[0];
      let toId = item.value.split(',')[1];

      this.utils.lastUsedAirport = fromId;

      this.utils.getFlightBetween(fromId, toId, data => {
        this.utils.flightData = data;
        this.utils.flightDataSubject.next(data);
      });
    } 
    else {
      // this.utils.state.next(4);
      this.utils.travellers = item.value;
    }
    this.hide();
  }

  hide() {
    document.getElementById('list_dialog').classList.remove('show');
  }

}
